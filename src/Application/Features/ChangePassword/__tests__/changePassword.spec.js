import ChangePassword from '../ChangePassword';
import StaffService from '../../utilities/services/StaffService';
import { mockReq } from '../../../../__tests__/__mocks__';

jest.mock('@sendgrid/mail', () => () => ({
  setApiKey: () => {},
  send: () => {}
}));

describe('ChangePassword Unit test', () => {
  it('should throw an exception if an error occurs', async () => {
    jest.spyOn(StaffService, 'findStaffByStaffIdOrEmail').mockRejectedValue('failed');

    try {
      await ChangePassword.processPasswordUpdate(mockReq, 'models');
    } catch (e) {
      expect(e).toEqual('failed');
    }
  });

  it('should return a status of 500 if update fails', async () => {
    jest.spyOn(StaffService, 'findStaffByStaffIdOrEmail').mockResolvedValue('good');
    jest.spyOn(StaffService, 'findStaffByStaffIdOrEmail').mockResolvedValue(false);
    jest.spyOn(ChangePassword, 'currentPasswordIsCorrect').mockReturnValue(true);

    const [status, message] = await ChangePassword.processPasswordUpdate(mockReq);

    expect(status).toBe(500);
    expect(message).toBe('Password not changed!');
  });
});