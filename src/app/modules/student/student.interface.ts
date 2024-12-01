import { department } from './student.constant';

export interface TStudent {
  name: string;
  roll: number;
  department: typeof department[number];
  semester: string;
}
