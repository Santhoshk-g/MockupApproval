import { LightningElement,api,track } from 'lwc';
import submit from '@salesforce/apex/Mock_up_Automation.submitForApproval';
import { CloseActionScreenEvent } from 'lightning/actions';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class SubmitForApproval extends LightningElement {

    @api recordId;
    @track comments = ' ';
    @track error;

 onchangecomments(event){
  console.log('comments1'+  this.coments);
    this.coments = event.target.value;
    console.log('comments'+  this.coments);
    
 }  

 handleSubmit(){
    
  if(this.coments==null||this.coments==undefined||this.coments==''){
    this.coments =' ';
    console.log('Hi Salesforce');
  }
  console.log('Salesforce');
    submit({recordId:this.recordId,comments:this.coments})
    .then(result =>{
      this.dispatchEvent(
         new ShowToastEvent({
             title: 'Success',
             message: 'Record Submited for Approval',
             variant: 'success'
         })
      );
      this.dispatchEvent(new CloseActionScreenEvent());
    })
    .catch(error =>{
      this.error = error;
      this.dispatchEvent(
          new ShowToastEvent({
              title: 'Error!!',
              message: 'No Approval Process Found',
              variant: 'error',
          }),
      );
      this.dispatchEvent(new CloseActionScreenEvent());
    })
 }
}
