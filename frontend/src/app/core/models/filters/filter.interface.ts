export declare interface Filter {  
    cycle();
  
    apply(collection);

    reset();

    active: boolean;
    state: number;
  }