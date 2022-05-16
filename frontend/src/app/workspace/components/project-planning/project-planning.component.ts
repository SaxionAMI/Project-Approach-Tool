import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';
import { IWorkspaceData, Workspace } from '@app/core/models/workspace.model';
import { workspaceConfig } from '@app/core/models/workspaceConfig.model';
import { WorkspaceService } from '@app/workspace/services/workspace.service';
import { DxGanttComponent } from 'devextreme-angular';
import { exportGantt as exportGanttToPdf } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { Observable, Subject } from 'rxjs';
import { debounceTime, filter, map, switchMap, tap } from 'rxjs/operators';
import { LeaderLineWithId } from '../workspace-com/workspace.component';

@Component({
  selector: 'app-project-planning',
  templateUrl: './project-planning.component.html',
  styleUrls: ['./project-planning.component.css']
})
export class ProjectPlanningComponent implements OnInit {
  @ViewChild(DxGanttComponent, { static: false }) gantt: DxGanttComponent;

  private workspaceId: number;

  workspaceConfig: workspaceConfig = new workspaceConfig();

  lines: LeaderLineWithId[] = [];

  loading = true;

  formats: string[] = ['Auto', 'A0', 'A1', 'A2', 'A3', 'A4'];

  exportModes: string[] = ['All', 'Chart', 'Tree List'];

  dateRanges: string[] = ['All', 'Visible', 'Custom'];

  formatBoxValue: string;

  exportModeBoxValue: string;

  dateRangeBoxValue: string;

  landscapeCheckBoxValue: boolean;

  startTaskIndex: number;

  endTaskIndex: number;

  startDate: Date;

  endDate: Date;

  customRangeDisabled: boolean;

  exportButtonOptions: any;

  workspace$: Observable<IWorkspaceData>;

  workspaceTitle$: Observable<string>;

  activities$: Observable<any[]>;

  activities: any[];

  updatedTimeBoxesBuffer = [];

  bufferTimer$ = new Subject();

  constructor(
    private workspaceService: WorkspaceService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.workspaceId = this.route.snapshot.params.id;
    this.workspaceConfig.canEditTitle = false;
    this.workspaceConfig.canEditGoal = false;

    this.loading = true;
    this.workspace$ = this.workspaceService.getWorkspaceById(`${this.workspaceId}`);

    this.workspaceTitle$ = this.workspace$.pipe(map(workspace => workspace.title));

    this.activities$ = this.workspace$.pipe(map(workspace => {
      const sortedGroups = workspace.groups.sort((a, b) => a.location.x - b.location.x);

      return sortedGroups.reduce((acc, next) => {
        const parentActivity = {id: `${next.id}`, title: next.title, color: '#aaa', isGroup: true};
        const childActivities = next.cards.filter(card => !!card.color).map(card => ({
          id: `${card.id}`,
          title: card.title,
          color: card.color,
          type: card.type,
          note: card.note,
          picture: card.picture,
          start: card.startDate ?? '2022-02-03', //startDate
          end: card.endDate?? '2022-02-04', //endDate
          parentId: parentActivity.id,
          isGroup: false,
        }));
        return [...acc, parentActivity, ...childActivities];
      }, [])
    }), tap(activities => this.activities = activities));

    this.activities$.subscribe(data => {
      this.loading = false;
    });

    this.exportButtonOptions = {
      hint: 'Export to PDF',
      icon: 'exportpdf',
      stylingMode: 'text',
      onClick: () => this.exportButtonClick(),
    };

    this.formatBoxValue = this.formats[0];
    this.landscapeCheckBoxValue = true;
    this.exportModeBoxValue = this.exportModes[0];
    this.dateRangeBoxValue = this.dateRanges[0];
    this.customRangeDisabled = true;


    // Update cards after 1 second from last change
    this.bufferTimer$.pipe(debounceTime(1000)).subscribe(() => {
      this.updateCards(this.updatedTimeBoxesBuffer).subscribe();
    });
  }

  exportButtonClick() {
    const gantt = this.gantt.instance;
    const format = this.formatBoxValue.toLowerCase();
    const isLandscape = this.landscapeCheckBoxValue;
    const exportMode = 'all';
    const dataRangeMode = this.dateRangeBoxValue.toLowerCase();
    let dataRange;
    if (dataRangeMode === 'custom') {
      dataRange = {
        startIndex: this.startTaskIndex,
        endIndex: this.endTaskIndex,
        startDate: this.startDate,
        endDate: this.endDate,
      };
    } else {
      dataRange = dataRangeMode;
    }
    exportGanttToPdf(
      {
        component: gantt,
        createDocumentMethod: (args?: any) => new jsPDF(args),
        format,
        landscape: isLandscape,
        exportMode,
        dateRange: dataRange,
      },
    ).then((doc) => doc.save('gantt-chart-planning.pdf'));
  }

  onChanges(data) {
    if (this.activities.find(activity => activity.id === data.key).isGroup) {
      return;
    }

    if (!data.values.start && !data.values.end) {
      return;
    }

    let updatedFields = {};
    const startDate = data.values.start;
    const endDate = data.values.end;

    if (startDate) {
      updatedFields = {
        ...updatedFields,
        startDate,
      };

      this.updateTimeBoxBuffer({id: data.key, startDate});
      this.bufferTimer$.next();
    }

    if (endDate) {
      updatedFields = {
        ...updatedFields,
        endDate,
      };
      this.updateTimeBoxBuffer({id: data.key, endDate});
      this.bufferTimer$.next();
    }
  }

  /**
   * Remove the arrows and log out
   * @returns void
   */
  onLogout(): void {
    this.removeArrows();
    this.authService.logout();
  }

  /**
   * remove all arrows from the workspace.
   * This is method is mostly used when going back to another workspace or logging out.
   * @returns void
   */
   removeArrows(): void {
    for (const line of this.lines) {
      line.line.remove();
    }
  }

  /**
   * when going back to the workspaces list
   * @returns void
   */
   onBack(): void {
    this.removeArrows();
    this.router.navigate(["workspace", this.workspaceId]);
  }

  private updateTimeBoxBuffer(data: {id: string, startDate?: Date, endDate?: Date}) {
    const exsitingUpdateIndex = this.updatedTimeBoxesBuffer.findIndex(timeBox => timeBox.id === data.id);
    if (exsitingUpdateIndex !== -1) {
      this.updatedTimeBoxesBuffer[exsitingUpdateIndex] = {...this.updatedTimeBoxesBuffer[exsitingUpdateIndex], ...data};
    } else {
      this.updatedTimeBoxesBuffer = [...this.updatedTimeBoxesBuffer, data];
    }
  }

  private updateCards(changes: any[]) {
    return this.workspace$.pipe(
      map(workspace => new Workspace(workspace)),
      map(workspace => workspace.updateCards(changes)),
      filter(workspace => !!workspace),
      switchMap(workspace => this.workspaceService.updateWorkspaceGroups(workspace)),
    );
  }
}