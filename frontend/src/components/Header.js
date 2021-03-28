import { getUserInfo } from '../localStorage';
import { parseRequestUrl } from '../utils';

const Header = {
  render: async () => {
    const { firstname, isAdmin } = getUserInfo();
    const { value } = parseRequestUrl();
    return `
    <div class="logo">
        <a href="/#/">Makar's Bazaar</a>
    </div>
</div>
 <div class="search">
        <form class="search-form"  id="search-form">
          <input placeholder= "search product here.." type="text" name="q" id="q" value="${
            value || ''
          }" /> 
          <button type="submit"><i class="fa fa-search"></i></button>
        </form>        
      </div>
    <div>
        <div class="dropdown">
        ${
          firstname
            ? `<a href="/#/profile"> Welcome ${firstname}! <i class="fas fa-user" style="font-size:12px"></i> </a>`
            : '<a href="/#/signin"> Sign-In <i class="fas fa-user" style="font-size:12px"></i></a>'
        }
    <div class="dropdown-content">
  
    ${
      firstname
        ? ''
        : '<a href="/#/register"> Register <i class="fas fa-user" style="font-size:12px"></i></a>'
    }
        </div>
    </div>
        <a href="/#/cart">Cart <i class="fa fa-shopping-cart" style="font-size:12px"></i>
        </a>
        ${isAdmin ? '<a href="/#/dashboard">Dashboard</a>' : ''}

</div>
    `;
  },
  after_render: () => {
    document
      .getElementById('search-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault();
        const searchKeyword = document.getElementById('q').value;
        document.location.hash = `/?q=${searchKeyword}`;
      });
  },
};
export default Header;
