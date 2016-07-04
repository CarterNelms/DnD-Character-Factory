import { Service } from './base/service';

export class AppService extends Service{
  public modals;

  constructor () {
    this.modals = {
      help: {
        header: '',
        body: ''
      }
    }
    super();
  }
}
