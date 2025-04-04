/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable import/namespace */
import dynamic from "next/dynamic";
import { FC, ReactNode, useEffect, useState } from "react";
import { Spinner } from "@heroui/spinner";
import {
  Modal,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@heroui/modal";
import classNames from "classnames";
import useAxios from "@/hooks/useAxios";
import { useSession } from "next-auth/react";
import { UserProfile } from "@/types/next-auth";

const Tree = dynamic(
  () => import("react-organizational-chart").then((mod) => mod.Tree),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

const TreeNode = dynamic(
  () => import("react-organizational-chart").then((mod) => mod.TreeNode),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

const getChildren: any = (docs: any[], id: string, index: number) => {
  if (!docs[index]) return [];
  return docs[index].filter((r: any) => r.sponsor_id == id);
};

const StyledNode: FC<{
  children: ReactNode;
  node: any;
  onClick: (node: any) => void;
}> = ({ children, ...rest }) => {
  return (
    <div className="flex flex-col justify-center items-center space-y-2 py-2">
      <div
        className="bg-gray-100 w-min text-white rounded-full aspect-square relative hover:cursor-pointer"
        onClick={() => rest.onClick(rest.node)}
      >
        <img
          className={classNames(
            "w-[50px] h-[50px] min-w-[50px] p-1 rounded-full",
            rest.node.avatar ? "object-cover" : "object-contain"
          )}
          src={rest.node.avatar || "/img/nopeople.png"}
        />
        {/*rest.node.rank && rest.node.rank != "none" && (
          <img
            src={`/img/ranks/${rest.node.rank}.png`}
            className="absolute right-0 h-[30px] w-[30px] min-w-[30px] min-h-[30px] bottom-0 translate-x-1/2 translate-y-1/5"
          />
        )*/}
      </div>
      <label className="font-bold text-white">
        {rest.node.name?.slice(0, 8)}
      </label>
    </div>
  );
};

const DirectChart2 = () => {
  const { data } = useSession();
  const [userId, setUserId] = useState(data!.user.id);
  const { isOpen, onOpenChange } = useDisclosure();
  const [openUser, setOpenUser] = useState<null | UserProfile>(null);

  const docs = useAxios<any[]>({
    url: "users/direct-tree",
    method: "get",
    defaultValue: [],
  });

  const selectedUser = useAxios<UserProfile>(
    {
      url: `users/get-one/${userId}`,
      method: "get",
    },
    [userId]
  );

  const openNode = (node: UserProfile) => {
    setOpenUser(node);
    onOpenChange();
  };

  if (
    selectedUser.loading ||
    !selectedUser.data ||
    docs.loading ||
    docs.data!.length == 0
  )
    return <Spinner />;

  return (
    <div className="relative overflow-auto card h-full">
      <Tree
        lineWidth={"2px"}
        lineColor={"#444"}
        lineBorderRadius={"10px"}
        label={
          <StyledNode onClick={() => {}} node={selectedUser.data}>
            YO
          </StyledNode>
        }
      >
        {getChildren(docs.data, selectedUser.data.id, 0).map((node: any) => (
          <TreeNode
            key={node.id}
            label={
              <StyledNode onClick={openNode} node={node}>
                {node.name || ""}
              </StyledNode>
            }
          >
            {getChildren(docs.data, node.id, 1).map((node: any) => (
              <TreeNode
                key={node.id}
                label={
                  <StyledNode onClick={openNode} node={node}>
                    {node.name}
                  </StyledNode>
                }
              >
                {getChildren(docs.data, node.id, 2).map((node: any) => (
                  <TreeNode
                    key={node.id}
                    label={
                      <StyledNode onClick={openNode} node={node}>
                        {node.name}
                      </StyledNode>
                    }
                  >
                    {getChildren(docs.data, node.id, 3).map((node: any) => (
                      <TreeNode
                        key={node.id}
                        label={
                          <StyledNode onClick={openNode} node={node}>
                            {node.name}
                          </StyledNode>
                        }
                      >
                        {getChildren(docs.data, node.id, 4).map((node: any) => (
                          <TreeNode
                            key={node.id}
                            label={
                              <StyledNode onClick={openNode} node={node}>
                                {node.name}
                              </StyledNode>
                            }
                          >
                            {getChildren(docs.data, node.id, 5).map(
                              (node: any) => (
                                <TreeNode
                                  key={node.id}
                                  label={
                                    <StyledNode onClick={openNode} node={node}>
                                      {node.name}
                                    </StyledNode>
                                  }
                                ></TreeNode>
                              )
                            )}
                          </TreeNode>
                        ))}
                      </TreeNode>
                    ))}
                  </TreeNode>
                ))}
              </TreeNode>
            ))}
          </TreeNode>
        ))}
      </Tree>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        {openUser && (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {openUser!.name}
            </ModalHeader>
            <ModalBody>
              <div className="text-black flex flex-col text-lg md:text-xl">
                <div className="pb-8 underline"></div>
                <span>Email: {openUser!.email}</span>

                <div className="pt-4">
                  <button
                    className="bg-blue-500 rounded-md px-4 py-2 hover:bg-blue-800"
                    onClick={() => {
                      setUserId(openUser!.id);
                      onOpenChange();
                    }}
                  >
                    Ver Red
                  </button>
                </div>
              </div>
            </ModalBody>
          </>
        )}
      </Modal>
    </div>
  );
};

export default DirectChart2;
