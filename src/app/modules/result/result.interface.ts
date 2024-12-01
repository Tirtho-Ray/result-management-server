import { department, semester } from "./result.constant";

export interface TStudent {
  name: string;
  roll: number;
  department: typeof department[number];
  semester: typeof semester[number];
  subject:
}
