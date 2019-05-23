import ClaimService from '../../services/ClaimService';

class AdministrationHelpers {
  static convertStaffWorksheetToObjectsArray(tenantRef, worksheet) {
    const arrayOfStaff = [];

    worksheet.eachRow((row) => {
      // eslint-disable-next-line
      const [emptyCell, staffId, firstname, lastname, middleName, email, phone] = row.values;
      arrayOfStaff.push({
        tenantRef, staffId, firstname, lastname, middleName, email, phone
      });
    });

    return arrayOfStaff;
  }

  static convertBranchWorksheetToObjectsArray(tenantRef, worksheet) {
    const arrayOfBranches = [];

    worksheet.eachRow((row) => {
      // eslint-disable-next-line
      const [emptyCell, name, solId] = row.values;
      arrayOfBranches.push({
        tenantRef, name, solId
      });
    });

    return arrayOfBranches;
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
        'Staff.branch.solId': solId,
        'Staff.branch.name': branch,
        'Staff.role.name': role
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

  static async submittedClaimsForAdmin(tenantRef) {
    const claims = await ClaimService.fetchSubmittedClaims(tenantRef);
    return AdministrationHelpers.filterAdminClaimsQueryResult(claims);
  }

  static getClaimStatistics(filteredClaims) {
    const claimStats = {
      total: filteredClaims.length, approved: 0, declined: 0, pending: 0
    };
    return filteredClaims.reduce(AdministrationHelpers.statAccumulator, claimStats);
  }

  static statAccumulator(acc, claim) {
    if (['Processing', 'Completed'].includes(claim.status)) acc.approved += 1;
    if (claim.status.includes('Awaiting')) acc.pending += 1;
    if (claim.status === 'Declined') acc.declined += 1;
    if (claim.status === 'Cancelled') acc.total -= 1;
    return acc;
  }

  static getChartStatistics(tenantRef) {
    return ClaimService.getChartStatistics(tenantRef);
  }
}

export default AdministrationHelpers;
