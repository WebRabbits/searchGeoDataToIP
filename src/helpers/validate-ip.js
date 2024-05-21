// Валидация ввденного IP-адреса в поле ввода на странице сайта

import { viewModalMessage } from '../index';

export function validatIp(ip) {
  if (
    /^(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
      ip
    )
  ) {
    return true;
  } else {
    // alert('You have to enter valid IP address');
    let error = 'You have to enter valid IP address';
    viewModalMessage(error);
  }
}
