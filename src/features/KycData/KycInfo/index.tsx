import { getKycByUserApi } from "@/services/kyc";
import { useInfoStore } from "@/store/info.store";
import { UserKycDataType } from "@/types/common";
import { UserPayload } from "@/types/record";
import {
  Alert,
  Box,
  Card,
  Flex,
  Image,
  InputLabel,
  SimpleGrid,
  Space,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import memoizeOne from "memoize-one";
import useSWR from "swr";

export const kycLevelIs = memoizeOne((data: UserKycDataType) => {
  const isLevel1 = Boolean(data.firstName) && Boolean(data.lastName);
  const isLevel2 = Boolean(
    data.images?.kycLvl1Front && data.images?.kycLvl1Back,
  );
  const isLevel3 = Boolean(
    data.images?.kycLvl2Front && data.images.kycLvl2Back,
  );
  const currentLevel = isLevel3 ? 3 : isLevel2 ? 2 : isLevel1 ? 1 : 0;
  const currentLevelAsLabel = [
    "Unverified",
    "Unverified",
    "Basic",
    "Advanced",
  ][currentLevel];
  const currentLevelAsColor = [
    "#ff0000",
    "#ff0000",
    "orange",
    "green",
  ][currentLevel];
  return {
    isLevel1,
    isLevel2,
    isLevel3,
    currentLevel,
    currentLevelAsLabel,
    currentLevelAsColor,
  };
});

type PropsType = {
  activeUser?: UserPayload;
};
export function KycInfo({ activeUser }: PropsType) {
  // eslint-disable-next-line @typescript-eslint/indent
  const { getUserByUId } = useInfoStore();
  const { data } = useSWR(
    ["/get-pay-data", activeUser?.depositCode],
    ([, uid]) => {
      const userId = getUserByUId(uid as string)?.id as string;
      return getKycByUserApi({ userId });
    },
  );
  return (
    <Box>
      <Alert
        variant="light"
        title="KYC Information"
        icon={<IconInfoCircle />}
      >
        <SimpleGrid
          cols={{
            xs: 1,
            sm: 2,
          }}
        >
          <Text>
            Email: <strong>{activeUser?.email}</strong>
          </Text>
          <Text>
            Mobile: <strong>{activeUser?.mobile ?? "--"}</strong>
          </Text>
          <Text>
            UID: <strong>{activeUser?.depositCode}</strong>
          </Text>
          {data && (
            <Text>
              KYC Level:{" "}
              <strong
                style={{
                  color: kycLevelIs(data).currentLevelAsColor,
                }}
              >
                {kycLevelIs(data).currentLevelAsLabel}
              </strong>
            </Text>
          )}
        </SimpleGrid>
      </Alert>
      <Space my={"md"} />
      <Card withBorder>
        <Title order={3}>Info KYC verification</Title>
        <Space my={"md"} />
        <SimpleGrid
          styles={{
            container: {
              gap: 10,
            },
          }}
        >
          <SimpleGrid
            cols={{
              xs: 1,
              sm: 2,
            }}
          >
            <TextInput
              label="First Name:"
              readOnly
              value={data?.firstName}
            />
            <TextInput
              label="Last Name:"
              readOnly
              value={data?.lastName}
            />
          </SimpleGrid>
          <SimpleGrid
            cols={{
              xs: 1,
              sm: 2,
            }}
          >
            <TextInput
              label="Date of birth:"
              readOnly
              value={data?.dateOfBirth}
            />
            <TextInput
              label="Address:"
              readOnly
              value={data?.address}
            />
            <TextInput
              label="Gender:"
              readOnly
              value={data?.gender}
            />
            <TextInput
              label="Country:"
              readOnly
              value={data?.country}
            />
            <TextInput
              label="idType:"
              readOnly
              value={data?.idType}
            />
          </SimpleGrid>
          <Box
            hidden={
              data ? kycLevelIs(data).currentLevel === 0 : false
            }
          >
            <InputLabel>Document Pictures:</InputLabel>
            <SimpleGrid cols={2}>
              <Flex direction={"column"}>
                <Text my={"sm"} ta={"center"} fw={"bold"}>
                  Front of Document
                </Text>
                <Card shadow="lg" withBorder h={300}>
                  <Flex
                    justify={"center"}
                    align={"center"}
                    h={"100%"}
                  >
                    <Image
                      maw={"100%"}
                      mah={"100%"}
                      src={
                        data?.images?.kycLvl2Front ??
                        data?.images?.kycLvl1Front
                      }
                    />
                  </Flex>
                </Card>
              </Flex>
              <Flex direction={"column"}>
                <Text my={"sm"} ta={"center"} fw={"bold"}>
                  Back of Document
                </Text>
                <Card shadow="lg" withBorder h={300}>
                  <Flex
                    justify={"center"}
                    align={"center"}
                    h={"100%"}
                  >
                    <Image
                      maw={"100%"}
                      mah={"100%"}
                      src={
                        data?.images?.kycLvl2Back ??
                        data?.images?.kycLvl1Back
                      }
                    />
                  </Flex>
                </Card>
              </Flex>
            </SimpleGrid>
          </Box>
        </SimpleGrid>
      </Card>
    </Box>
  );
}

