import Dates from '../Dates';
import ClaimService from '../../services/ClaimService';
import { claimTypeRates } from '../../utils/general';

class ClaimHelpers {
  static calculateClaimAmount(overtimeRequest) {
    const claimTypeList = Object.keys(overtimeRequest);

    const claimAmountAccumulator = (accumulator, claimType) => {
      const claimUnits = overtimeRequest[claimType];
      const claimRate = claimTypeRates[claimType];
      accumulator += claimUnits * claimRate;
      return accumulator;
    };

    return claimTypeList.reduce(claimAmountAccumulator, 0);
  }

  static createOvertimeRequestObject(overtimeRequest, staffId) {
    return {
      monthOfClaim: Dates.convertPreviousYearMonthToString(),
      ...overtimeRequest,
      requester: staffId,
      amount: ClaimHelpers.calculateClaimAmount(overtimeRequest),
      status: 'Awaiting supervisor'
    };
  }

  static responseMessage(overtimeRequest) {
    return {
      messageWhenCreated: 'Your claim request was created successfully.',
      messageWhenNotCreated: `You have already submitted a claim request for ${
        overtimeRequest.monthOfClaim
      }. If you wish to make changes, please cancel the current claim and create a new one.`
    };
  }

  static filterQueryResult(queryResult, lineManagerRole) {
    const staff = lineManagerRole === 'BSM' ? 'bsmStaff' : 'supervisorStaff';

    return queryResult.map((result) => {
      const {
        [`${staff}.staffId`]: staffId,
        [`${staff}.firstname`]: staffFirstName,
        [`${staff}.lastname`]: staffLastName,
        [`${staff}.image`]: image,
        [`${staff}.Claims.id`]: claimId,
        [`${staff}.Claims.monthOfClaim`]: monthOfClaim,
        [`${staff}.Claims.weekday`]: weekday,
        [`${staff}.Claims.weekend`]: weekend,
        [`${staff}.Claims.shift`]: shift,
        [`${staff}.Claims.status`]: status
      } = result;
      return {
        staffId,
        staffFirstName,
        staffLastName,
        image,
        claimId,
        monthOfClaim,
        weekday,
        weekend,
        shift,
        status
      };
    });
  }

  static filterAdminClaimsQueryResult(queryResult) {
    return queryResult.map((result) => {
      const {
        weekday,
        weekend,
        shift,
        amount,
        status,
        monthOfClaim: monthofclaim,
        'Staff.staffId': staffId,
        'Staff.firstname': firstname,
        'Staff.lastname': lastname,
        'Staff.middleName': middlename,
        'Staff.Branch.solId': solId,
        'Staff.Branch.branchName': branch,
        'Staff.staffRole.name': role
      } = result;
      return {
        weekday,
        weekend,
        shift,
        amount,
        status,
        staffId,
        firstname,
        lastname,
        middlename,
        solId,
        branch,
        monthofclaim,
        role
      };
    });
  }

  static filterReminderPendingClaims(queryResult) {
    return queryResult.map((result) => {
      const { 'Staff.firstname': firstname, 'Staff.email': email } = result;
      return { firstname, email };
    });
  }

  static getIdsOfFilteredPendingClaims(filteredPendingClaims) {
    return filteredPendingClaims.map(claim => claim.claimId);
  }

  static async submittedClaimsForAdmin(tenantRef) {
    const claims = await ClaimService.fetchSubmittedClaims(tenantRef);
    return ClaimHelpers.filterAdminClaimsQueryResult(claims);
  }

  static async pendingClaimsForlineManager(tenantRef, lineManager) {
    const { lineManagerRole } = lineManager;
    const pendingClaims = await ClaimService.fetchPendingClaimsForLineManagers(tenantRef, lineManager);
    const filteredResults = ClaimHelpers.filterQueryResult(pendingClaims, lineManagerRole);
    return filteredResults;
  }

  static async getIdsOfClaimsAssignedToLineManager(tenantRef, lineManager) {
    const filteredResults = await ClaimHelpers.pendingClaimsForlineManager(tenantRef, lineManager);
    const pendingClaimIds = ClaimHelpers.getIdsOfFilteredPendingClaims(filteredResults);
    return pendingClaimIds;
  }
}

export default ClaimHelpers;