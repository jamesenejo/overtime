const headerAndFooterContent = require('../seederHelper/emailTemplateHeaderAndFooter');

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('EmailTemplate', [{
    name: 'Reset',
    description: 'Reset passwords',
    subject: 'Password Reset',
    htmlMessage: `<html lang="en" dir="ltr">
      ${headerAndFooterContent('header')}
      <body>
        <div class="cover">
          <div class="wrapper">
            <h2>Aaaah! You forgot your password!</h2>
            <p>Not a problem, {{staffFirstName}}. Click the button below to reset it</p>
            <a href="http://init.overtime-api.example.com:7000/confirm-reset-request?hash={{hash}}" target="_blank">
              <button>Reset password</button>
            </a>
          </div>
          ${headerAndFooterContent('footer')}
        </div>
      </body>
    </html>`,
    createdAt: '2019-01-12',
    updatedAt: '2018-01-12'
  },
  {
    name: 'New Claim Supervisor',
    description: 'Notify Supervisor of newly submitted claim',
    subject: 'New Overtime Claim Request',
    htmlMessage: `<html lang="en" dir="ltr">
      ${headerAndFooterContent('header')}
      <body>
        <div class="cover">
          <div class="content-wrapper">
            <section class="letter">
              <div class="header">
                <img src="https://res.cloudinary.com/invergent/image/upload/v1550692251/assets/invergent04a.png" alt="Logo">
              </div>
              <hr>
              <article class="body">
                <h2>New Overtime Claim request</h2>
                <div class="paragraphs">
                  <p>Dear {{supervisorFirstName}},</p>
                  <p><strong>{{staffFirstName}} {{staffLastName}}</strong> just submitted an overtime claim. It is awaiting your approval.</p>
                  <p>Click the button below to access all pending claims awaiting your approval.</p>
                </div>
                <div class="button-wrapper">
                  <a href="http://init.overtime-api.example.com:7000/approvals?hash={{hash}}" target="_blank">
                    <button>View pending claims</button>
                  </a>
                </div>
              </article>
            </section>
            ${headerAndFooterContent('footer')}
          </div>
        </div>
      </body>
    </html>`,
    createdAt: '2019-02-23',
    updatedAt: '2018-02-23'
  },
  {
    name: 'New Claim BSM',
    description: 'Notify BSM of newly approved claim by staff\'s supervisor',
    subject: 'New Overtime Claim Request',
    htmlMessage: `<html lang="en" dir="ltr">
      ${headerAndFooterContent('header')}
      <body>
        <div class="cover">
          <div class="content-wrapper">
            <section class="letter">
              <div class="header">
                <img src="https://res.cloudinary.com/invergent/image/upload/v1550692251/assets/invergent04a.png" alt="Logo">
              </div>
              <hr>
              <article class="body">
                <h2>New Overtime Claim request</h2>
                <div class="paragraphs">
                  <p>Dear {{bsmFirstName}},</p>
                  <p><strong>{{staffFirstName}} {{staffLastName}}</strong>'s overtime claim was approved by <strong>{{supervisorFirstName}} {{supervisorLastName}}</strong>. Your approval is required to commence processing the claim.</p>
                  <p>Click the button below to access all pending claims awaiting your approval.</p>
                </div>
                <div class="button-wrapper">
                  <a href="http://init.overtime-api.example.com:7000/approvals?hash={{hash}}" target="_blank">
                    <button>View pending claims</button>
                  </a>
                </div>
              </article>
            </section>
            ${headerAndFooterContent('footer')}
          </div>
        </div>
      </body>
    </html>`,
    createdAt: '2019-02-23',
    updatedAt: '2018-02-23'
  },
  {
    name: 'New Claim Staff',
    description: 'Notify staff of newly submitted claim',
    subject: 'Overtime Claim Request Submitted Successfully!',
    htmlMessage: `<html lang="en" dir="ltr">
      ${headerAndFooterContent('header')}
      <body>
        <div class="cover">
          <div class="content-wrapper">
            <section class="letter">
              <div class="header">
                <img src="https://res.cloudinary.com/invergent/image/upload/v1550692251/assets/invergent04a.png" alt="Logo">
              </div>
              <hr>
              <article class="body">
                <h2>New Overtime Claim request</h2>
                <div class="paragraphs">
                  <p>Dear {{staffFirstName}},</p>
                  <p>Your new overtime claim request was created successfully. Ensure you follow up on your line managers for prompt approval and processing of your claim.</p>
                  <p>You can click the button below to see the progress of your pending claim.</p>
                </div>
                <div class="button-wrapper">
                  <a href="http://init.overtime-api.example.com:7000/users/claims/pending" target="_blank">
                    <button>View pending claims</button>
                  </a>
                </div>
              </article>
            </section>
            ${headerAndFooterContent('footer')}
          </div>
        </div>
      </body>
    </html>`,
    createdAt: '2019-03-03',
    updatedAt: '2018-03-03'
  },
  {
    name: 'Supervisor Approved',
    description: 'Notify staff when supervisor approves claim',
    subject: 'Claim Request: Supervisor Approval',
    htmlMessage: `<html lang="en" dir="ltr">
      ${headerAndFooterContent('header')}
      <body>
        <div class="cover">
          <div class="content-wrapper">
            <section class="letter">
              <div class="header">
                <img src="https://res.cloudinary.com/invergent/image/upload/v1550692251/assets/invergent04a.png" alt="Logo">
              </div>
              <hr>
              <article class="body">
                <h2>Claim request Approval</h2>
                <div class="paragraphs">
                  <p>Dear {{staffFirstName}},</p>
                  <p>Your overtime claim request has been approved by your supervisor. It is now awaiting your BSM's approval.</p>
                  <p>You can click the button below to see the progress of your pending claim.</p>
                </div>
                <div class="button-wrapper">
                  <a href="http://init.overtime-api.example.com:7000/users/claims/pending" target="_blank">
                    <button>View pending claims</button>
                  </a>
                </div>
              </article>
            </section>
            ${headerAndFooterContent('footer')}
          </div>
        </div>
      </body>
    </html>`,
    createdAt: '2019-03-03',
    updatedAt: '2018-03-03'
  },
  {
    name: 'BSM Approved',
    description: 'Notify staff when BSM approves claim',
    subject: 'Claim Request: BSM Approval',
    htmlMessage: `<html lang="en" dir="ltr">
      ${headerAndFooterContent('header')}
      <body>
        <div class="cover">
          <div class="content-wrapper">
            <section class="letter">
              <div class="header">
                <img src="https://res.cloudinary.com/invergent/image/upload/v1550692251/assets/invergent04a.png" alt="Logo">
              </div>
              <hr>
              <article class="body">
                <h2>Claim request Approval</h2>
                <div class="paragraphs">
                  <p>Dear {{staffFirstName}},</p>
                  <p>Your overtime claim request has been approved by your BSM. It is now being processed by Admin.</p>
                  <p>You can click the button below to see the progress of your pending claim.</p>
                </div>
                <div class="button-wrapper">
                  <a href="http://init.overtime-api.example.com:7000/users/claims/pending" target="_blank">
                    <button>View pending claims</button>
                  </a>
                </div>
              </article>
            </section>
            ${headerAndFooterContent('footer')}
          </div>
        </div>
      </body>
    </html>`,
    createdAt: '2019-03-04',
    updatedAt: '2018-03-04'
  },
  {
    name: 'Supervisor Declined',
    description: 'Notify staff when Supervisor declines claim',
    subject: 'Claim Request: Supervisor Approval',
    htmlMessage: `<html lang="en" dir="ltr">
      ${headerAndFooterContent('header')}
      <body>
        <div class="cover">
          <div class="content-wrapper">
            <section class="letter">
              <div class="header">
                <img src="https://res.cloudinary.com/invergent/image/upload/v1550692251/assets/invergent04a.png" alt="Logo">
              </div>
              <hr>
              <article class="body">
                <h2>Claim request Approval</h2>
                <div class="paragraphs">
                  <p>Dear {{staffFirstName}},</p>
                  <p>Your overtime claim request has been declined by your supervisor. Please liaise with your line managers and create a new claim request if you need to.</p>
                  <p>Thank you.</p>
                </div>
              </article>
            </section>
            ${headerAndFooterContent('footer')}
          </div>
        </div>
      </body>
    </html>`,
    createdAt: '2019-03-04',
    updatedAt: '2018-03-04'
  },
  {
    name: 'BSM Declined',
    description: 'Notify staff when BSM declines claim',
    subject: 'Claim Request: BSM Approval',
    htmlMessage: `<html lang="en" dir="ltr">
      ${headerAndFooterContent('header')}
      <body>
        <div class="cover">
          <div class="content-wrapper">
            <section class="letter">
              <div class="header">
                <img src="https://res.cloudinary.com/invergent/image/upload/v1550692251/assets/invergent04a.png" alt="Logo">
              </div>
              <hr>
              <article class="body">
                <h2>Claim request Approval</h2>
                <div class="paragraphs">
                  <p>Dear {{staffFirstName}},</p>
                  <p>Your overtime claim request has been declined by your BSM. Please liaise with your line managers and create a new claim request if you need to.</p>
                  <p>Thank you.</p>
                </div>
              </article>
            </section>
            ${headerAndFooterContent('footer')}
          </div>
        </div>
      </body>
    </html>`,
    createdAt: '2019-03-04',
    updatedAt: '2018-03-04'
  },
  {
    name: 'Claim Cancelled',
    description: 'Notify staff when staff cancels claim request',
    subject: 'Claim Request Cancelled',
    htmlMessage: `<html lang="en" dir="ltr">
      ${headerAndFooterContent('header')}
      <body>
        <div class="cover">
          <div class="content-wrapper">
            <section class="letter">
              <div class="header">
                <img src="https://res.cloudinary.com/invergent/image/upload/v1550692251/assets/invergent04a.png" alt="Logo">
              </div>
              <hr>
              <article class="body">
                <h2>Claim request Approval</h2>
                <div class="paragraphs">
                  <p>Hi {{staffFirstName}},</p>
                  <p>Your pending claim request was successfully cancelled. Feel free to create another claim anytime.</p>
                  <p>Thank you.</p>
                </div>
              </article>
            </section>
            ${headerAndFooterContent('footer')}
          </div>
        </div>
      </body>
    </html>`,
    createdAt: '2019-03-04',
    updatedAt: '2018-03-04'
  },
  {
    name: 'Claim Completed',
    description: 'Notify staff when claim request has been processed',
    subject: 'Claim Request Completed',
    htmlMessage: `<html lang="en" dir="ltr">
      ${headerAndFooterContent('header')}
      <body>
        <div class="cover">
          <div class="content-wrapper">
            <section class="letter">
              <div class="header">
                <img src="https://res.cloudinary.com/invergent/image/upload/v1550692251/assets/invergent04a.png" alt="Logo">
              </div>
              <hr>
              <article class="body">
                <h2>Claim request completed</h2>
                <div class="paragraphs">
                  <p>Hi {{staffFirstName}},</p>
                  <p>Your claim request has been processed. Your account would be credited with the value xxxx as payment for your overtime claim for the month of xxxx, xxxx.</p>
                  <p>Thank you.</p>
                </div>
              </article>
            </section>
            ${headerAndFooterContent('footer')}
          </div>
        </div>
      </body>
    </html>`,
    createdAt: '2019-03-04',
    updatedAt: '2018-03-04'
  },
  {
    name: 'Pending Claim Reminder',
    description: 'Notify staff of claim yet to be approved',
    subject: 'Pending Claim Reminder',
    htmlMessage: `<html lang="en" dir="ltr">
      ${headerAndFooterContent('header')}
      <body>
        <div class="cover">
          <div class="content-wrapper">
            <section class="letter">
              <div class="header">
                <img src="https://res.cloudinary.com/invergent/image/upload/v1550692251/assets/invergent04a.png" alt="Logo">
              </div>
              <hr>
              <article class="body">
                <h2>Claim Request Pending</h2>
                <div class="paragraphs">
                  <p>Hi {{staffFirstName}},</p>
                  <p>Please be reminded that your claim is yet to be approved. It is important that you follow up with your line managers for approval, so your claim can be processed.</p>
                  <p>Time is running out.</p>
                  <p>Thank you.</p>
                </div>
              </article>
            </section>
            ${headerAndFooterContent('footer')}
          </div>
        </div>
      </body>
    </html>`,
    createdAt: '2019-03-04',
    updatedAt: '2018-03-04'
  }]),
  down: queryInterface => queryInterface.dropTable('EmailTemplate')
};