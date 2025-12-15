export interface LoginPostData {
    email: string;
    password: string;
  }
     
export interface RegisterPostData extends LoginPostData{
    fullName: string;
  }
  
export interface User extends RegisterPostData {
    _id: string;
    isAdmin: string;
  }

/*** for testing purpose only  *******/
  export interface RegisterPostDataTest {
    
    fullName: string | null | undefined;
    email: string | null | undefined;
    password: string | null | undefined;
    isAdmin: string | null | undefined;
    
  }
