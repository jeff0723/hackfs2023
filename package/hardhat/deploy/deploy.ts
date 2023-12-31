import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { hashiAddressFVM, ghoulsAddress } from "../utils/constants";
import { ethers, network, run } from "hardhat";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
	const { deployments, getNamedAccounts } = hre;
	const { deploy } = deployments;

	const { deployer } = await getNamedAccounts();

	const hashverifier = await deploy('HashiVerifier', {
		from: deployer,
		args: [hashiAddressFVM],
		log: true,
		autoMine: true, // speed up deployment on local network (ganache, hardhat), no effect on live networks
	});

	console.log(hashverifier.address)

	const constructorargsNFT = [ghoulsAddress, "", "0x4C0b2D94Eaf9A63EECaCeFba2B2e89E047657d14"]

	const hackFsAiNFT = await deploy('HackFSAINFT', {
		from: deployer,
		args: constructorargsNFT,
		log: true,
		autoMine: true,
	})
	// console.log('Verifying HashVerifier.... ')
	await run(`verify:verify`, {
		address: hashverifier.address,
		constructorArguments: [hashiAddressFVM],
	});
	// console.log('Verifying HashVerifier.... ')
	await run(`verify:verify`, {
		address: hackFsAiNFT.address,
		constructorArguments: constructorargsNFT,
	});

};
export default func;
func.tags = ['HashiVerifier'];