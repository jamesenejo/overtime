import Claim from '../Claim';
import ClaimService from '../../../services/ClaimService';
import { mockReq } from '../../../../__tests__/__mocks__';

describe('Claim Unit Test', () => {
  describe('runClaimApproval', () => {
    it('should send a non-approval message if approval was not updated on the DB.', async () => {
      jest.spyOn(Claim, 'checkThatClaimIsAssignedToLineManager').mockResolvedValue([200, 'okay']);
      jest.spyOn(ClaimService, 'approveClaim').mockResolvedValue([false, {}]);

      const result = await Claim.runClaimApproval(mockReq, 'approve');

      expect(result).toHaveLength(3);
      expect(result[0]).toEqual(200);
      expect(result[1]).toEqual('Claim not approved.');
    });
  });
});
