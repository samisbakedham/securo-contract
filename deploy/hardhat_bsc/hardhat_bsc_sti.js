const { network } = require("hardhat");

const ERC20_ABI = require("@openzeppelin/contracts-upgradeable/build/contracts/ERC20Upgradeable").abi;

const { common } = require("../../parameters");
const { sendEth } = require("../../scripts/utils/ethereum");

module.exports = async () => {

  await network.provider.request({method: "hardhat_impersonateAccount", params: [common.admin]});

  const usdtHolder = await ethers.getSigner('0xF977814e90dA44bFA03b6295A0616a897441aceC');
  await network.provider.request({method: "hardhat_impersonateAccount", params: [usdtHolder.address]});
  const usdt = new ethers.Contract('0x55d398326f99059fF775485246999027B3197955', ERC20_ABI, usdtHolder);
  await usdt.transfer(deployer.address, await usdt.balanceOf(usdtHolder.address));

  await network.provider.request({method: "hardhat_impersonateAccount", params: ['0x0000000000000000000000000000000000001004']});
  await sendEth('0x0000000000000000000000000000000000001004', deployer.address, '100000000');
};

module.exports.tags = ["hardhat_bsc_sti"];
module.exports.dependencies = [
  "hardhat_bsc_reset",
  "bscMainnet_sti"
];
