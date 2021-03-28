import { hideLoading, showLoading } from '../utils';
/**
 * Screen view that invokes a
 * function that renders a 404 response
 * if a URL route entered to parse for is not found.
 * @returns HTML markup with the error message not found
 */
const Error404Screen = {    

  before_render: () => {
    showLoading();
  },
  render: () => {
    hideLoading();
    return `
        <div style="text-align:center; margin-top:30px">
        <h1 style="font-size:50px">404</h1>
        <h2>This Page is Not Real!</h2>
        <!-- Illustration from https://www.kapwing.com/404-illustrations--!>
        
        <div class="error-img">
        <img src="./images/error404.png"></img>
        </div>
        <button class="btn btn-primary error" onclick="location.href = '#';"><a href="#"> Click here to Return to home<a/></button></div>
        `;
  },
};
export default Error404Screen;
