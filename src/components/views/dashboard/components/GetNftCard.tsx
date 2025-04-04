import CardBanner from "@/components/utils/cards/CardBanner";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ethers } from "ethers";
import contractABI from "../../../../../artifacts/contracts/DotaNFT.sol/DotaNFT.json";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";
import { useLocalstorage } from "@/hooks/useLocalstorage";
import axiosInstance from "@/services";

const CONTRACT_ADDRESS = "0x24f5bD37CE11393C2eda7D42E71fb19665bE4504";

const GetNftCard = () => {
  const [account, setAccount] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const [nft, setNft] = useState<null | Record<string, any>>(null);
  const status = useLocalstorage<string>("nft_status", nft);

  useEffect(() => {
    if (status === null) {
      getNft();
    }
  }, [status]);

  const getNft = async () => {
    const res = await axiosInstance.get(`users/nft`);
    localStorage.setItem("nft_status", res.data.status);

    setNft(res.data.data);
  };

  const setNFTReclaim = async () => {
    const res = await axiosInstance.post(`users/nft-reclaim`);
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        setLoading(true);
        if (!nft) await getNft();
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        setAccount(await signer.getAddress());
      } catch (err) {
        toast.error(t("dashboard_view.banner_nft.wallet_denied"));
      } finally {
        setLoading(false);
      }
    } else {
      toast.error(t("dashboard_view.banner_nft.need_install_metamask"));
    }
  };

  const mintNFT = async () => {
    if (!account) return alert(t("dashboard_view.banner_nft.need_connect"));

    setLoading(true);
    try {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          contractABI.abi,
          signer
        );

        const tx = await contract.mintNFT(account, JSON.stringify(nft));
        await tx.wait();

        await setNFTReclaim();
        await getNft();

        toast.success(t("dashboard_view.banner_nft.success_get"));
      }
    } catch (error) {
      console.error(error);
      toast.error("Error mintear NFT");
    }
    setLoading(false);
  };

  return (
    <CardBanner img="/img/buy-nft.png" position="top">
      <span className="text-3xl font-bold">
        {t("dashboard_view.banner_nft.title")}
      </span>

      {status !== "reclaim" && (
        <Button
          onPress={account ? mintNFT : connectWallet}
          className="shadow shadow-gray-300 border"
          color="secondary"
          isLoading={loading}
        >
          {account
            ? t("dashboard_view.banner_nft.get_button")
            : t("dashboard_view.banner_nft.connnect_button")}
        </Button>
      )}
    </CardBanner>
  );
};

export default GetNftCard;
