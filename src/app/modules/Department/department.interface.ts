import { Departments } from "./department.constant"

export type TDepartment = {
    name: typeof  Departments[number];
}
