import { UserPaymentMethods } from '../payment-method/Payment';

export class UserGeneral{
    userId : number;
    userEmail : string;
    userPassword : string;
    userName : string;
    userLastname : string;
    userAddress : string;
    userBirthDay : string;
    userPaymentMethos : [UserPaymentMethods];
}