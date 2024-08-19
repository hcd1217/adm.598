
import { z } from "zod";


export const booleanSchema = z.boolean();

export const stringSchema = z.string();

export const numberSchema = z.number();

export const optionalNumberSchema = z.number().optional();

export const optionalStringSchema = stringSchema.optional();

export const speNumberSchema = stringSchema.or(numberSchema);

export const nullableSpeNumberSchema = speNumberSchema.or(z.null()).transform((val) => val ?? 0);

export const userConfigSchema = z.object({
    leverages: z.record(
        stringSchema,
        numberSchema.int().positive().min(1).max(200),
    ),
});

export const authenticationPayloadSchema = z.object({
    id: stringSchema,
    uid: stringSchema,
    nickName: optionalStringSchema,
    avatar: optionalStringSchema,
    depositCode: stringSchema,
    fiatDepositMemo: optionalStringSchema,
    affiliateCode: stringSchema,
    emailVerified: booleanSchema,
    mobileVerified: booleanSchema,
    hasMfa: booleanSchema,
    hasAntiPhishingCode: booleanSchema,
    kycLevel: numberSchema.int().positive().min(0).max(4),
    email: optionalStringSchema,
    mobile: optionalStringSchema,
    isCopyMaster: booleanSchema,
    masterAccountId: optionalStringSchema,
    config: userConfigSchema.optional(),
    accounts: z
        .object({
            fundingAccountId: optionalStringSchema,
            tradingAccountId: optionalStringSchema,
        })
        .optional(),
});

export type AuthenticationPayload = z.infer<
    typeof authenticationPayloadSchema
>;

export enum UserUpdateType {
    NICK_NAME = "NICK_NAME",
    AVATAR = "AVATAR",
    UPDATE_PASSWORD = "UPDATE_PASSWORD",
    KYC_DATA = "KYC_DATA",
    ADD_EMAIL = "ADD_EMAIL",
    ADD_MOBILE = "ADD_MOBILE",
    ADD_MFA = "ADD_MFA",
    UPDATE_MFA = "UPDATE_MFA",
    VERIFY_EMAIL = "VERIFY_EMAIL",
    VERIFY_MOBILE = "VERIFY_MOBILE",
    UPDATE_ANTI_PHISHING_CODE = "UPDATE_ANTI_PHISHING_CODE",
  }

  export const userKycDataSchema = z.object({
    country: optionalStringSchema,
    firstName: optionalStringSchema,
    lastName: optionalStringSchema,
    kanaFirstName: optionalStringSchema,
    kanaLastName: optionalStringSchema,
    romanjiFirstName: optionalStringSchema,
    romanjiLastName: optionalStringSchema,
    fullName: optionalStringSchema,
    dateOfBirth: optionalStringSchema,
    idNumber: optionalStringSchema,
    idType: z
      .enum(["ID", "DRIVER_LICENSE", "PASSPORT", "OTHER"])
      .optional(),
    address: optionalStringSchema,
    images: z
      .object({
        IDCertificateFront: optionalStringSchema,
        IDCertificateBack: optionalStringSchema,
        proofOfAddress: optionalStringSchema,
        selfie: optionalStringSchema,
        selfieWithDocument: optionalStringSchema,
      })
      .optional(),
  });

  export const updateUserPayloadSchema = z
  .object({
    type: z.enum([
      UserUpdateType.NICK_NAME,
      UserUpdateType.AVATAR,
      UserUpdateType.UPDATE_PASSWORD,
      UserUpdateType.KYC_DATA,
      UserUpdateType.ADD_EMAIL,
      UserUpdateType.ADD_MOBILE,
      UserUpdateType.ADD_MFA,
      UserUpdateType.UPDATE_MFA,
      UserUpdateType.VERIFY_EMAIL,
      UserUpdateType.VERIFY_MOBILE,
      UserUpdateType.UPDATE_ANTI_PHISHING_CODE,
    ]),
    avatar: optionalStringSchema,
    nickName: optionalStringSchema,
    emailVerificationCode: optionalStringSchema,
    mobileVerificationCode: optionalStringSchema,
    kycData: userKycDataSchema.optional(),
    mobile: optionalStringSchema,
    antiPhishingCode: optionalStringSchema,
    email: z.string().email().optional(),
    password: optionalStringSchema,
    currentPassword: optionalStringSchema,
    mfaSecret: optionalStringSchema,
    mfaCode: optionalStringSchema,
    oldMfaCode: optionalStringSchema,
    verificationCode: optionalStringSchema,
  })
  .partial()
  .required({ type: true });
