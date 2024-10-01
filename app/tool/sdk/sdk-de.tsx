import { Button, Textarea } from "@nextui-org/react";
// import crypto from "crypto";
import React from "react";
/**
 * <?php

class DesUtil
{
    const DES_KEY = '548711fd';

    public static function decrypt($str): bool|string
    {
        return self::decryptDES(hex2bin($str), self::DES_KEY);
    }

    public static function decryptDES($str, $key): bool|string
    {
        return openssl_decrypt($str, "DES-ECB", $key, OPENSSL_RAW_DATA);
    }

    public static function encrypt($str): string
    {
        return bin2hex(self::encryptDES($str, self::DES_KEY));
    }

    public static function encryptDES($str, $key): bool|string
    {
        return openssl_encrypt($str, "DES-ECB", $key, OPENSSL_RAW_DATA);
    }
}

$data = '6c5a885cb031e22bc5074dd99b74afeee4ddca014e0b25ea44c8ec926cd762376f0f5337ef684a3cb471c77862e1bc9f5e2146dcd5f33183dae9aecc2e12cf1c72ab36e4a9354ea8e111ad8be20028debf24a8ef6a10d167cf7778cd744727f9c1fb1bb3146e23f5dae9aecc2e12cf1c72ab36e4a9354ea8e111ad8be20028debf24a8ef6a10d167cf7778cd744727f96703ed9343a8f689e4ddca014e0b25ea8e67ec4cb5f225c704f926b6e409def1ea2e068781c370fe4fa6ff0479862154e4ddca014e0b25eaf2c7c38ba5d82be2587b1a7fcf6fdf336e659354c1877e1d860d8090907f320e9b26f6f10938fed37f230371e0b0ef9134ec5167293d3aabf8bef5b8c652af0cecd2f693eb7c6de6dae9aecc2e12cf1c34ff333c10c15cbb7833be98804326e8f0a8ca4595d315da69d8414370b842ffa07dd405a5bdb863f2976b94ca524b5112d8a7a8927baed675cdd2d641f6a493532cd6ad9528859d83c0518285a7e6a4993113de25238dc94901509b64d9f821496166c32df313c06b74bceba662c8a2f18ab2892b038a7a083162771fff1fe194a3394d0ec6de531e06282cb6a360abb2907cdc4715edfc9232b3fe87b7b111aee9a44ea428e103083162771fff1fe13a66be35be1f4537496166c32df313c06b74bceba662c8a26c413b32a77f9bb94d717460108b3718d71696aa81a233a23ded9b97796578cd5988f28f9a15071fc930cfe585f53cfc10283de4361001a0ec13a7e0a012f2aa62d82209e08e0325e9c421402e52efb225d42d6224d873167339e178c9ee8d725d41cbe484a30361d4ef5c327b0ecec7779175f8cadea1e0388118f1ee4c306332512246b5e2f49ecac0149de273a1f9412ccce7457ab94257be42c1ad289fd0039bf1f0bb4a4baaf789f6b5e2c871bc676dd0487bf15aa13ecc4d6109184ff0216b9a4eb95bdd73a66dc8a53eff8455fc333f07f16bc051f31d9fb5627a8214b01483390221c8f2061b02f6d4886688e58fb53c7b60d1e099374a17fbd87ffeea7dcbd30193820eee7881c37b2e6727f3fc60ff394f08ae7afdff4317b5000bfa874367b8cb1851a0befc5a05f4569e81973d40da26c22b3ded9b97796578cd77955ef629d1b42bbdd06182469e6046b80e3e45dc4aee9f5e4ef90d64f2eed35d3dec221cccdae11d262dd79d3f4370912ad0f661d75fc44b10c4915ea06a9ead1797d161b3b9f0104c248e26d5f8de4765416b0c4f3e17be02b51aaaa1b7e47afdff4317b5000bfa874367b8cb1851fbb1cc5e8d53545d24c75ebe3d02a858fc333f07f16bc0517df469c09d0a24d79fe53a5f51df8f461bf5578c06533a4459e11c63d4daa7578130709e646330fc931aee8e9fc5cdd223e53c080692e6b2b799eefe55b96e9baf749b8671678052c3b13d847c85c0958e532cfdc402776786c233bd42ac8e3b55b6196d0451aa27d9e93368ca83655533273d9012cc6387b8ff98f0bcf510bd94a3394d0ec6de531e06282cb6a360ab241487eb4dbf989a7af0e8717ac334e2d33504e39d2331ac74e3c352af537bc64f3e3e77d40793a82d1da09963d39eefe9c421402e52efb225d42d6224d8731687c1184081773fc71e0baaa7736e501ad4ef5c327b0ecec7779175f8cadea1e04a4feac61bc8f4393610b2d854f29e03b3b49b64946bfb9309c9f79f367a6d98275b119e7505251585ee86275ccecf42dd7601cf3859e24267a6c83a463d576ee7aa448150ca3c3be9d71f69910c3e50d7e015af27a68542b85630feeacfb9cf6ef5db3d43371cde1726b820ea8d918f161a418e6b2bb8bbde1c131fa834ffe5f781bd053aba2cb621bb461a704d8e177f0c6ce95da4d655afdcd05df2fd0600fa9191fb6ebda8b01021501a428d541c867fab58fed163530e32e1a24de0ec76b08680233e41c1257e81324e77867372309260ee1a897750da0e2d5d5315c2964765416b0c4f3e17fa37846cf48f4b2fb1cb7390fe70a85e25d42d6224d873169f3c543348ce877b9645f980300bea070057e9a3a5a78384f4fefd65663a4d7f8588becec6e51c0b3ded9b97796578cd2bbf03ab834210d1509ce42f62a7948beb832eec8916b1f3c1bd00ef0925bf2783a62632195d85fe708a5377bc29afb2b3d8d520d76e07f86a28c74e18e8256b32fdf98debf86640ba6275bca30976209fe0b3c5f6a64686ae47313e43199556ba4a27b0230c65807b15e022d6dbbf802b1eaa6cac62c3ed4ee938880be35d93';
echo DesUtil::decrypt($data);
 
 */

export const SdkEd = () => {
  const [before, setBefore] = React.useState("");

  const [after, setAfter] = React.useState("");

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-4">
        <Textarea
          label="加密前报文"
          value={before}
          onChange={(e) => {
            setBefore(e.target.value);
          }}
        />
        <Button color="primary">解密</Button>
      </div>
      <div className="flex flex-col gap-4">
        <Textarea
          label="加密后报文"
          value={after}
          onChange={(e) => {
            setAfter(e.target.value);
          }}
        />
        <Button color="primary">加密</Button>
      </div>
    </div>
  );
};
