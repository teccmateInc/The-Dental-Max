//import { Tooth } from "../pages/plan-details/plan-details.component";

export class Odontogram {
    teeth: Tooth[];
    constructor() {
        const upperLeft = [18, 17, 16, 15, 14, 13, 12, 11].map(number => new Tooth(number));
        const upperRight = [21, 22, 23, 24, 25, 26, 27, 28].map(number => new Tooth(number));
        const bottomLeft = [48, 47, 46, 45, 44, 43, 42, 41].map(number => new Tooth(number));
        const bottomRight = [31, 32, 33, 34, 35, 36, 37, 38].map(number => new Tooth(number));
        this.teeth = [...upperLeft, ...upperRight, ...bottomLeft, ...bottomRight];
    }
}

export class ToothDiagnosis {
    condition: string;
    options?: string;
}

export class ToothPlan {
    treatment: string;
    options?: string;
}

export class Tooth {
    number: number;
    selected: boolean;
    bleach?: boolean;
    all_on_four?: boolean;
    missing?: boolean;
    implant?: boolean;
    gengiva_normal?: boolean;
    bone_normal?: boolean;
    bone_line_normal?: boolean;
    diagnosis: ToothDiagnosis[];
    plan: ToothPlan[];

    constructor(number: number) {
        this.number = number;
        this.bleach = false;
        this.all_on_four = false;
        this.missing = false;
        this.implant = false;
        this.gengiva_normal = true;
        this.bone_normal = true;
        this.bone_line_normal = true;
        this.diagnosis = [];
        this.plan = [];
    }
}