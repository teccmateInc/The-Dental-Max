export class Plan {
    Tag: string;
    Teeths: string;
    Surface: string;
    Observation: string;
    Price: number;
    Date: Date;
}

export class PlanStages {
    StageName: string;
    Plans: Plan[];
    StageTotal: number;

    constructor() {
        this.Plans = [];
    }
}