import { useState, useCallback, useMemo } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useSession } from "next-auth/react";
import useWindowSize from "@/hooks/useWindowSize";
import { useQueryState } from "nuqs";
import useAxios from "@/hooks/useAxios";
import { Button } from "@heroui/react";
import arrowCreate, { DIRECTION } from "arrows-svg";
import NodeAvatar from "./BinaryNode";
import { useTranslation } from "react-i18next";

export default function BinaryChart() {
  const i18n = useTranslation();
  const [userID] = useQueryState("userID");
  const { data } = useSession();
  const [rootNodeId, setRootNodeId] = useState(userID ? userID : data!.user.id);
  const [arrowsSetted, setArrows] = useState(false);
  const [openModal, setOpenModal] = useState<null | string>(null);
  const { width } = useWindowSize();

  const isSM = useMemo(() => width && width <= 1700, [width]);
  const { data: tree, loading } = useAxios<any>(
    {
      url: `binary/get-tree/${rootNodeId}`,
      method: "get",
    },
    [rootNodeId]
  );

  const containerWidth = isSM ? 750 : 1200;

  const initPosition = isSM ? 300 : 700 - 150;

  const renderarrow = useCallback(() => {
    const head = {
      func: () => {
        return {
          node: '<rect x="-10" y="-10" width="20" height="25" style="display: none" />',
          width: 1,
          height: 1,
        };
      },
    };

    const wrapper = document.querySelector("#treeWrapper");

    const nodemain: HTMLElement = document.querySelector("#node-main")!;
    const left: HTMLElement = document.querySelector("#left")!;
    const right: HTMLElement = document.querySelector("#right")!;
    const left_left: HTMLElement = document.querySelector("#left-left")!;
    const left_right: HTMLElement = document.querySelector("#left-right")!;
    const right_left: HTMLElement = document.querySelector("#right-left")!;
    const right_right: HTMLElement = document.querySelector("#right-right")!;

    if (wrapper && nodemain && !arrowsSetted) {
      setArrows(true);
      const arrow1 = arrowCreate({
        head,
        from: {
          node: nodemain,
          direction: DIRECTION.LEFT,
        },
        to: {
          node: left,
          direction: DIRECTION.TOP,
        },
      });
      wrapper.appendChild(arrow1.node);

      const arrow2 = arrowCreate({
        head,
        from: {
          node: nodemain,
          direction: DIRECTION.RIGHT,
        },
        to: {
          node: right,
          direction: DIRECTION.TOP,
        },
      });
      wrapper.appendChild(arrow2.node);

      const arrow3 = arrowCreate({
        head,
        from: {
          node: left,
          direction: DIRECTION.BOTTOM,
        },
        to: {
          node: left_left,
          direction: DIRECTION.TOP,
        },
      });
      wrapper.appendChild(arrow3.node);

      const arrow4 = arrowCreate({
        head,
        from: {
          node: left,
          direction: DIRECTION.BOTTOM,
        },
        to: {
          node: left_right,
          direction: DIRECTION.TOP,
        },
      });
      wrapper.appendChild(arrow4.node);

      const arrow5 = arrowCreate({
        head,
        from: {
          node: right,
          direction: DIRECTION.BOTTOM,
        },
        to: {
          node: right_left,
          direction: DIRECTION.TOP,
        },
      });
      wrapper.appendChild(arrow5.node);

      const arrow6 = arrowCreate({
        head,
        from: {
          node: right,
          direction: DIRECTION.BOTTOM,
        },
        to: {
          node: right_right,
          direction: DIRECTION.TOP,
        },
      });
      wrapper.appendChild(arrow6.node);
    }
  }, []);

  const showLeft = async () => {
    if (data!.user.id == rootNodeId) {
      setOpenModal("left");
    }
  };

  const showRight = async () => {
    if (data!.user.id == rootNodeId) {
      setOpenModal("right");
    }
  };

  const closeModal = () => {
    setOpenModal(null);
  };

  if (!tree) return null;

  return (
    <div
      id="treeWrapper"
      className="w-full card h-full overflow-auto flex justify-center"
    >
      {/*<Dialog
        isOpen={openModal !== null}
        width={1000}
        closable={true}
        onClose={closeModal}
      >
        <table className="w-full">
          <thead>
            <tr>
              <th>Puntos</th>
              <th>Usuario</th>
              <th>Correo</th>
              <th>Patrocinador</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {openModal == "left" &&
              leftPoints.map((r, index) => (
                <tr key={index}>
                  <td className="text-center">{r.points}</td>
                  <td className="text-center">{r.user_name}</td>
                  <td className="text-center">{r.user_email}</td>
                  <td className="text-center">{r.user_sponsor}</td>
                  <td className="text-center">{r.created_at}</td>
                </tr>
              ))}
            {openModal == "right" &&
              rightPoints.map((r, index) => (
                <tr key={index}>
                  <td className="text-center">{r.points}</td>
                  <td className="text-center">{r.user_name}</td>
                  <td className="text-center">{r.user_email}</td>
                  <td className="text-center">{r.user_sponsor}</td>
                  <td className="text-center">{r.created_at}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </Dialog>*/}

      <div
        className="relative"
        style={{ width: containerWidth, paddingBottom: 40 }}
      >
        {rootNodeId != data!.user.id && (
          <>
            <div className="absolute left-1 top-1">
              <Button
                onPress={() => setRootNodeId(data!.user.id)}
                isLoading={loading}
              >
                {i18n.t("my_team.binary.home")}
              </Button>
            </div>
            <div className="absolute left-1 top-14">
              <Button
                disabled={loading}
                onPress={() =>
                  setRootNodeId(tree.tree.data.parent_binary_user_id)
                }
              >
                <FaChevronUp />
              </Button>
            </div>
          </>
        )}

        <>
          <div
            className="absolute"
            style={{ left: initPosition - 100, top: 10 }}
          >
            <button onClick={showLeft}>
              <b>
                {i18n.t("my_team.binary.left")}: {tree?.left_points} pts
              </b>
            </button>
          </div>
          <div
            className="absolute"
            style={{ left: initPosition + 320, top: 10 }}
          >
            <button onClick={showRight}>
              <b>
                {i18n.t("my_team.binary.right")}: {tree?.right_points} pts
              </b>
            </button>
          </div>
        </>

        <NodeAvatar
          {...tree.tree.data}
          isSM={isSM}
          id="node-main"
          x={initPosition}
          y={10}
          ref={renderarrow}
          i18n={i18n}
        />

        <>
          {tree.tree.left ? (
            <NodeAvatar
              {...tree.tree.left.data}
              isSM={isSM}
              id="left"
              x={initPosition - (isSM ? 200 : 300)}
              y={isSM ? 130 : 220}
              onClick={() => setRootNodeId(tree.tree.left.data.id)}
              i18n={i18n}
            />
          ) : (
            <NodeAvatar
              id="left"
              x={initPosition - (isSM ? 200 : 300)}
              y={isSM ? 130 : 220}
              isSM={isSM}
              i18n={i18n}
            />
          )}
          {tree.tree.right ? (
            <NodeAvatar
              {...tree.tree.right.data}
              isSM={isSM}
              id="right"
              x={initPosition + (isSM ? 220 : 300)}
              y={isSM ? 130 : 220}
              onClick={() => setRootNodeId(tree.tree.right.data.id)}
              i18n={i18n}
            />
          ) : (
            <NodeAvatar
              id="right"
              x={initPosition + (isSM ? 220 : 300)}
              y={isSM ? 130 : 220}
              isSM={isSM}
              i18n={i18n}
            />
          )}
        </>

        <>
          {tree.tree.left?.left ? (
            <NodeAvatar
              {...tree.tree.left.left.data}
              isSM={isSM}
              id="left-left"
              x={initPosition - (isSM ? 300 : 430)}
              y={isSM ? 300 : 450}
              size="s"
              onClick={() => setRootNodeId(tree.tree.left.left.data.id)}
              i18n={i18n}
            />
          ) : (
            <NodeAvatar
              id="left-left"
              isSM={isSM}
              x={initPosition - (isSM ? 300 : 430)}
              y={isSM ? 300 : 450}
              size="s"
              i18n={i18n}
            />
          )}
          {tree.tree.left?.right ? (
            <NodeAvatar
              {...tree.tree.left.right.data}
              isSM={isSM}
              id="left-right"
              x={initPosition - (isSM ? 100 : 160)}
              y={isSM ? 300 : 450}
              size="s"
              onClick={() => setRootNodeId(tree.tree.left.right.data.id)}
              i18n={i18n}
            />
          ) : (
            <NodeAvatar
              id="left-right"
              isSM={isSM}
              x={initPosition - (isSM ? 100 : 160)}
              y={isSM ? 300 : 450}
              size="s"
              i18n={i18n}
            />
          )}

          {tree.tree.right?.left ? (
            <NodeAvatar
              {...tree.tree.right.left.data}
              isSM={isSM}
              id="right-left"
              x={initPosition + (isSM ? 110 : 170)}
              y={isSM ? 300 : 450}
              size="s"
              onClick={() => setRootNodeId(tree.tree.right.left.data.id)}
              i18n={i18n}
            />
          ) : (
            <NodeAvatar
              id="right-left"
              isSM={isSM}
              x={initPosition + (isSM ? 110 : 170)}
              y={isSM ? 300 : 450}
              size="s"
              i18n={i18n}
            />
          )}
          {tree.tree.right?.right ? (
            <NodeAvatar
              {...tree.tree.right.right.data}
              isSM={isSM}
              id="right-right"
              x={initPosition + (isSM ? 330 : 450)}
              y={isSM ? 300 : 450}
              size="s"
              onClick={() => setRootNodeId(tree.tree.right.right.data.id)}
              i18n={i18n}
            />
          ) : (
            <NodeAvatar
              id="right-right"
              isSM={isSM}
              x={initPosition + (isSM ? 330 : 450)}
              y={isSM ? 300 : 450}
              size="s"
              i18n={i18n}
            />
          )}
          <div
            className="absolute"
            style={{
              left: initPosition - (isSM ? 280 : 380),
              top: initPosition + (isSM ? 160 : 120),
            }}
          >
            <Button onPress={() => setRootNodeId(tree.tree.left.data.id)}>
              <FaChevronDown />
            </Button>
          </div>
          <div
            className="absolute"
            style={{
              left: initPosition + (isSM ? 355 : 500),
              top: initPosition + (isSM ? 160 : 120),
            }}
          >
            <Button onPress={() => setRootNodeId(tree.tree.right.data.id)}>
              <FaChevronDown />
            </Button>
          </div>
        </>
      </div>
    </div>
  );
}
