import { mailTrapClient, sender } from "./mailtrap.config.js";
import { 
    VERIFICATION_EMAIL_TEMPLATE, 
    PASSWORD_RESET_REQUEST_TEMPLATE,
    PASSWORD_RESET_SUCCESS_TEMPLATE 
} from "./emailTemplate.js";
export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{ email }];

    try {
        const response = await mailTrapClient.send({
            from: sender,
            to: recipient,
            subject: "Account Verification",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification",
        })

        console.log("Email sent successfully", response)
    } catch(error) {
        console.error('Error sending verification', error);
        throw new Error('Error sending verification emailL ' + error.message);
    }
}

//"company_info_address": "Test_Company_info_address",
//"company_info_city": "Test_Company_info_city",
//"company_info_zip_code": "Test_Company_info_zip_code",
//"company_info_country": "Test_Company_info_country"
export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{ email }];

    try {
        const response = await mailTrapClient.send({
            from : sender,
            to: recipient,
            template_uuid: "3e80d34b-770c-4e8f-9eb7-36d3ab77beb4",
            template_variables: {
                "company_info_name": "Manh's company",
                "name": name,
            }

        })

        console.log("Verification email sent successfully", response)
    } catch(error) {
        console.error('Error sending welcome email', error);
        throw new Error('Error sending welcome email: ' + error.message);
    }
}

export const sendPasswordResetEmail = async (email, resetURL) => {
    const recipient = [{ email }];

    try {
        const response = await mailTrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset Account Password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Reset Password",
        })

        console.log("Email sent successfully", response)
        console.log("resetURL", resetURL)
    } catch(error) {
        console.error('Error sending verification', error);
        throw new Error('Error sending verification emailL ' + error.message);
    }
}

export const sendResetSuccessEmail = async (email) => {
    const recipient = [{ email }];

    try {
        const response = await mailTrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password Reset Successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Reset Password",
        });

        console.log("Email sent successfully", response)
    } catch(error) {
        console.error('Error sending verification', error);
        throw new Error('Error sending verification emailL ' + error.message);
    }
}