import React, { Component } from 'react';

class ContactUs extends Component {
    render() {
        return (
           <div class="container mb-4">
             <div class="row">
             <div class="col-md-6">
           <div class="card">
           
             <h5 class="card-header info-color white-text text-center py-4">
               <strong>Contact Us in</strong>
             </h5>
           
            {
                // <!--Card content-->
            }
             <div class="card-body px-lg-5 pt-0">
           
               {
                 //  <!-- Form -->
                }
               <form class="text-center" action="#!">
           
                 {
                    // <!-- Email -->
                    }
                 <div class="md-form">
                   <input type="email" id="materialLoginFormEmail" class="form-control" />
                   <label for="materialLoginFormEmail">E-mail</label>
                 </div>
           
               {  
                   //<!-- Password -->
                }
                 <div class="md-form">
                   <input type="password" id="materialLoginFormPassword" class="form-control" />
                   <label for="materialLoginFormPassword">Password</label>
                 </div>
           
                 <button class="btn btn-outline-info btn-rounded my-4 waves-effect z-depth-0" type="submit">Sign in</button>
           
               </form>
            
             </div>
             </div>
           </div>
           </div>
           </div>
        )
    }
}
export default ContactUs;