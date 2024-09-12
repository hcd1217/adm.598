import { useRecords } from "@/hooks/useRecords";
import { getUserListApi } from "@/services/auth";
import { KycApproveApi, kycRejectApi } from "@/services/kyc";
import { useInfoStore } from "@/store/info.store";
import { UserPayload } from "@/types/record";
import { fuzzySearchMultipleWords } from "@/utils/data";
import {
  Box,
  Button,
  Card,
  Flex,
  Modal,
  Popover,
  SimpleGrid,
  Space,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconBan,
  IconCircleCheck,
  IconEdit,
  IconRefresh,
} from "@tabler/icons-react";
import { keys, values } from "lodash";
import { DataTable } from "mantine-datatable";
import { useCallback, useMemo, useState } from "react";
import { KycInfo } from "./KycInfo";

type RecordFilterType = {
  isPendingKyc: boolean;
};

export function KycListFilter() {
  const {
    items: _t,
    form,
    refresh,
    isLoading,
    setPage,
    PAGE_SIZE,
    page,
  } = useRecords<RecordFilterType, UserPayload>(
    "/internal-api/get-all-users",
    getUserListApi,
    { isPendingKyc: true },
  );

  const [opened, { open, close }] = useDisclosure(false);
  const [activeUser, setActiveUser] = useState<UserPayload>();
  const [loading, setLoading] = useState<boolean>(false);
  const { usersPendingVerification: results, fetchUsers } =
    useInfoStore();

  const items = useMemo(() => {
    let _items = [...(results ?? [])];
    const _values = form.getValues();
    _items = fuzzySearchMultipleWords(
      results ?? [],
      keys(_values),
      values(_values) as string[],
    ) as typeof _t;

    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    const t = _items.slice(from, to);
    return t;
  }, [results, page, form, PAGE_SIZE]);

  const reject = useCallback(() => {
    setLoading(true);
    kycRejectApi({ userId: activeUser?.id as string })
      .then(() => {
        close();
        fetchUsers();
      })
      .finally(() => setLoading(false));
  }, [activeUser?.id, close, fetchUsers]);

  const approve = useCallback(() => {
    setLoading(true);
    KycApproveApi({ userId: activeUser?.id as string })
      .then(() => {
        close();
        fetchUsers();
      })
      .finally(() => setLoading(false));
  }, [activeUser?.id, close, fetchUsers]);

  return (
    <Box>
      <Card bd={1} p={0}>
        <Flex justify={"space-between"}>
          <Title order={3}>KYC Pending Requests</Title>
          <Button
            onClick={refresh}
            title="Refresh"
            disabled={isLoading}
            loading={isLoading}
          >
            <IconRefresh />
          </Button>
        </Flex>
      </Card>

      <Space my={"md"} />
      <DataTable
        height={"75vh"}
        withTableBorder
        withColumnBorders
        records={items}
        fetching={isLoading}
        totalRecords={results.length}
        recordsPerPage={PAGE_SIZE}
        page={page}
        onPageChange={(p) => setPage(p)}
        columns={[
          {
            accessor: "Action",
            title: "Action",
            sortable: true,
            render: (item) => (
              <>
                <Button
                  size="xs"
                  justify="space-between"
                  onClick={() => {
                    setActiveUser(item);
                    open();
                  }}
                  styles={{
                    label: {
                      gap: "5px",
                    },
                  }}
                >
                  <div>
                    Review <Space />
                  </div>
                  <IconEdit size={15} />
                </Button>
              </>
            ),
          },
          {
            accessor: "email",
            render: (item) => <>{item.email}</>,
            sortable: true,
          },
          {
            accessor: "depositCode",
            sortable: true,
            render: ({ depositCode }) => (
              <Text fw={"bold"}>{depositCode}</Text>
            ),
          },

          {
            accessor: "Posted at",
            render: () => new Date(Date.now()).toLocaleString(),
            sortable: true,
          },
          {
            accessor: "mobile",
            render: ({ mobile }) => mobile,
            sortable: true,
          },
          {
            accessor: "fullName",
            render: ({ fullName }) => <>{fullName}</>,
          },
        ]}
      />
      <Modal
        opened={opened}
        onClose={close}
        styles={{
          title: {
            flex: 1,
          },
        }}
        title={
          <Flex flex={1} justify={"space-between"}>
            <Title order={3}>KYC Verification</Title>
            <SimpleGrid cols={2} px={"md"}>
              <Popover
                width={200}
                position="bottom"
                withArrow
                shadow="md"
              >
                <Popover.Target>
                  <Button
                    bg={"red"}
                    styles={{
                      label: {
                        gap: "5px",
                      },
                    }}
                  >
                    <IconBan />
                    Reject
                  </Button>
                </Popover.Target>
                <Popover.Dropdown>
                  <Text size="md" ta={"center"}>
                    Are you sure?
                  </Text>
                  <Space my={"xs"} />
                  <Button
                    disabled={loading}
                    loading={loading}
                    onClick={reject}
                    fullWidth
                    size="xs"
                    bg={"red"}
                  >
                    Yes Reject!
                  </Button>
                </Popover.Dropdown>
              </Popover>

              <Popover
                width={200}
                position="bottom"
                withArrow
                shadow="md"
              >
                <Popover.Target>
                  <Button
                    styles={{
                      label: {
                        gap: "5px",
                      },
                    }}
                  >
                    <IconCircleCheck />
                    Approve
                  </Button>
                </Popover.Target>
                <Popover.Dropdown>
                  <Text size="md" ta={"center"}>
                    Are you sure?
                  </Text>
                  <Space my={"xs"} />
                  <Button
                    disabled={loading}
                    loading={loading}
                    onClick={approve}
                    fullWidth
                    size="xs"
                  >
                    Yes Approve!
                  </Button>
                </Popover.Dropdown>
              </Popover>
            </SimpleGrid>
          </Flex>
        }
        closeOnClickOutside={false}
        size={"xl"}
        fullScreen
      >
        <KycInfo activeUser={activeUser} />
      </Modal>
    </Box>
  );
}
