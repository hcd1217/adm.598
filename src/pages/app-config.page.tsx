import BN from "@/common/big-number";
import { AppConfig, SPENumber } from "@/common/types";
import {
  getAppConfigs,
  updateAppConfigs,
} from "@/services/app-config";
import { success } from "@/utils/notifications";
import { failed } from "@/utils/toast";
import {
  Anchor,
  Breadcrumbs,
  Button,
  Container,
  Flex,
  NumberInput,
  Space,
  Table,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { cloneDeep, isEqual } from "lodash";
import { useEffect, useState } from "react";
export default function Page() {
  const [base, setBase] = useState<AppConfig | undefined>();
  const [configs, setConfigs] = useState<AppConfig | undefined>(
    undefined,
  );
  useEffect(() => {
    getAppConfigs().then((data) => {
      setConfigs(cloneDeep(data));
      setBase(data);
    });
  }, []);
  return (
    <Container fluid>
      <Breadcrumbs
        separator={<IconChevronRight color="gray" size={14} />}
      >
        <Anchor fz={14} fw={400} href="/">
          Dashboard
        </Anchor>
        <Anchor fz={14} fw={400} c={"primary"}>
          APP Configs
        </Anchor>
      </Breadcrumbs>
      <Space my={"md"} />
      <Flex w="100%" justify="end" my="10px">
        <Button
          onClick={() => {
            if (!configs || isEqual(base, configs)) {
              failed("Error", "Noting to update");
              return;
            }
            updateAppConfigs(configs)
              .then(() => {
                success("Success", "Configs updated successfully");
                setBase(cloneDeep(configs));
              })
              .catch(() => {
                failed("Error", "Failed to update configs");
              });
          }}
        >
          Save
        </Button>
      </Flex>
      <Table withColumnBorders withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Config</Table.Th>
            <Table.Th>Value</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr>
            <Table.Td>FUTURE Funding fee (%)</Table.Td>
            <Table.Td>
              <NumberInput
                suffix="%"
                step={0.01}
                value={_round(
                  100 * (configs?.FEE.FUTURE.FR_PLUS || 0),
                )}
                onChange={(value) => {
                  if (configs) {
                    configs.FEE.FUTURE.FR_PLUS = _round(
                      BN.div(value, 100),
                    );
                    setConfigs({ ...configs });
                  }
                }}
              />
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>FUTURE Maker fee (%)</Table.Td>
            <Table.Td>
              <NumberInput
                suffix="%"
                step={0.01}
                value={_round(100 * (configs?.FEE.FUTURE.MAKER || 0))}
                onChange={(value) => {
                  if (configs) {
                    configs.FEE.FUTURE.MAKER = _round(
                      BN.div(value, 100),
                    );
                    setConfigs({ ...configs });
                  }
                }}
              />
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>FUTURE Taker fee (%)</Table.Td>
            <Table.Td>
              <NumberInput
                suffix="%"
                step={0.01}
                value={_round(100 * (configs?.FEE.FUTURE.TAKER || 0))}
                onChange={(value) => {
                  if (configs) {
                    configs.FEE.FUTURE.TAKER = _round(
                      BN.div(value, 100),
                    );
                    setConfigs({ ...configs });
                  }
                }}
              />
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>SPOT Maker fee (%)</Table.Td>
            <Table.Td>
              <NumberInput
                suffix="%"
                step={0.01}
                value={_round(100 * (configs?.FEE.SPOT.MAKER || 0))}
                onChange={(value) => {
                  if (configs) {
                    configs.FEE.SPOT.MAKER = _round(
                      BN.div(value, 100),
                    );
                    setConfigs({ ...configs });
                  }
                }}
              />
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>SPOT Taker fee (%)</Table.Td>
            <Table.Td>
              <NumberInput
                suffix="%"
                step={0.01}
                value={_round(100 * (configs?.FEE.SPOT.TAKER || 0))}
                onChange={(value) => {
                  if (configs) {
                    configs.FEE.SPOT.TAKER = _round(
                      BN.div(value, 100),
                    );
                    setConfigs({ ...configs });
                  }
                }}
              />
            </Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </Container>
  );
}

function _round(value: SPENumber) {
  return Math.round(Number(value) * 10000) / 10000;
}
