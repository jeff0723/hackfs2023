import { HACKFS_AI_NFT_ABI } from '@/constant/abis';
import { HACKFS_AI_NFT_ADDRESS } from '@/constant/addresses';
import { TransactionReceipt } from '@ethersproject/abstract-provider';
import { prepareWriteContract, writeContract, waitForTransaction } from '@wagmi/core';
import { parseGwei } from 'viem';
export const mintNFT = async ({
    to,
    tokenId,
    blockheader,
    signature,
    storageRoot,
    stateProof,
    storageProof
}: {
    to: string,
    tokenId: number,
    blockheader: string,
    signature: string,
    storageRoot: string,
    stateProof: string,
    storageProof: string
}): Promise<TransactionReceipt> => {

    // Prepare the transaction data
    const { request } = await prepareWriteContract({
        address: HACKFS_AI_NFT_ADDRESS,
        abi: HACKFS_AI_NFT_ABI,
        functionName: 'mint',
        args: [to,
            tokenId,
            blockheader,
            signature,
            storageRoot,
            stateProof,
            storageProof],
        maxFeePerGas: parseGwei('100'),
        maxPriorityFeePerGas: parseGwei('100'),

    });

    // Execute the transaction
    const { hash, } = await writeContract(request)


    // Wait for the transaction block to be mined
    const data = await waitForTransaction({
        hash,
    })
    //@ts-ignore
    return data;
}
