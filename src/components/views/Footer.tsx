import Link from "next/link";

const Footer = () => {
  return (
    <div className="flex justify-between w-full p-4 border-t  border-t-gray-700">
      <div className="flex flex-wrap justify-between w-full">
        <div className="flex gap-2">
          <div>
            <Link
              href="/public/terms_es.pdf"
              className="text-blue-400 underline"
            >
              Terms and Conditions
            </Link>
          </div>
          <div>
            <Link
              href="/public/privacy_policy_es.pdf"
              className="text-blue-400 underline"
            >
              Privacy
            </Link>
          </div>
        </div>
        <div className="flex gap-1 text-gray-500">
          <span>Developed by</span>
          <Link href="https://www.luthorsolutions.com/">Luthor Solutions</Link>
        </div>
        <span className="text-gray-500">
          {" "}
          © 2025, Dota. All rights reserved
        </span>
      </div>
    </div>
  );
};

export default Footer;
