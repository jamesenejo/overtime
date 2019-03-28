import express from 'express';
import Controller from '../Application';
import InputValidator from '../Application/Middlewares/InputValidator';
import Authenticator from '../Application/Middlewares/Authenticator';
import ClaimAccessControl from '../Application/Middlewares/ClaimAccessControl';

const router = express.Router();
const {
  forgotPassword, authoriseStaff, authoriseAdmin, authoriseLineManager, changePassword,
  updateBranch, confirmPasswordResetRequest, resetPassword, addOrChangeLineManager,
  createOvertimeClaim, pendingClaimsForlineManagers, approveClaim, declineClaim, cancelClaim,
  submittedClaims, exportDoc, updateEmailSchedule
} = Controller;
const {
  checkProps, checkEntries, checkBranchId, checkStaffId, checkOvertimeProps, checkDocType,
  checkOvertimeValues
} = InputValidator;
const {
  authenticateAdmin, authenticateStaff, authenticateLineManager, verifyLineManager
} = Authenticator;
const { validateClaimAccess } = ClaimAccessControl;

router.post('/signin', checkProps, checkEntries, authoriseStaff);
router.post('/admin/login', checkProps, checkEntries, authoriseAdmin);
router.get('/verify', verifyLineManager, authoriseLineManager);

router.post('/forgot-password', checkProps, checkStaffId, forgotPassword);
router.get('/confirm-reset-request', confirmPasswordResetRequest);

router.get('/line-manager/claims/pending', authenticateLineManager, pendingClaimsForlineManagers);
router.get('/line-manager/claims/pending/:claimId/approve', authenticateLineManager, approveClaim);
router.get('/line-manager/claims/pending/:claimId/decline', authenticateLineManager, declineClaim);

router.post('/users/claim',
  authenticateStaff, checkOvertimeProps, checkOvertimeValues, createOvertimeClaim);
router.delete('/users/claims/:claimId', authenticateStaff, validateClaimAccess, cancelClaim);

router.post('/users/profile/change-password',
  authenticateStaff, checkProps, checkEntries, changePassword);
router.post('/users/profile/line-manager',
  authenticateStaff, checkProps, checkEntries, addOrChangeLineManager);
router.put('/users/profile/branch', authenticateStaff, checkProps, checkBranchId, updateBranch);
router.post('/users/profile/reset', authenticateStaff, checkEntries, resetPassword);

router.get('/admin/claims', authenticateAdmin, submittedClaims);
router.get('/admin/claims/export/:docType', authenticateAdmin, checkDocType, exportDoc);

router.put('/admin/settings/email-schedule', authenticateAdmin, checkProps, checkEntries, updateEmailSchedule);

router.get('/', (req, res) => res.status(200).json({ message: `${req.tenantRef} boarded` }));

export default router;