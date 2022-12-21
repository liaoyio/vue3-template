import viewGenerator from './plop-templates/page/prompt.js';
import componentGenerator from './plop-templates/component/prompt.js';
import storeGenerator from './plop-templates/store/prompt.js';

export default (plop) => {
  plop.setGenerator('page', viewGenerator);
  plop.setGenerator('component', componentGenerator);
  plop.setGenerator('store', storeGenerator);
};
