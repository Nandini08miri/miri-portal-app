export class Approverstructure {
    public  ApproverStructureId :number;
    public  ApproverName :string;
    public  ApproverId:number;
    public  UserId :number;
    public  ApproverLevelId :number;
    public  ApproverPriority:boolean;
    public  IsEditable :boolean;
    public  IsActive:boolean;
    public PermissibleAmountINR :number;
    public PermissibleAmountUSD :number;
}
export enum ExpenseType {
   
    Reimbursement=2,
    Incentive=3,
  
}

export const expenseTypes=[
  
    {id:2,name:"Reimbursement"},
    {id:3,name:"Incentive"},
  
]