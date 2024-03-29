/** @format */
import styles from '@/styles/components/receipt-manager/ReceiptManager.module.css';
import { useEffect, useState } from 'react';
import { IReceipt } from '@/interfaces/IReceipt';
import * as CSVParser from '@/handlers/DataParser';
import PersonCard from '@/components/receipt-manager/personCell/PersonCard';
import ReceiptsTable from '@/components/receipt-manager/personCell/ReceiptsTable';
import { Category } from '@/handlers/DataParser';
import { IReceiptItem } from '@/interfaces/IReceiptItem';


export default function ReceiptManager(props: {
}) {
    const {
    } = props;

    const [firstPersonName, setFirstPersonName] = useState<string>('Person 1');
    const [firstReceipts, setFirstReceipts] = useState<IReceipt[]>([]);

    const [secondPersonName, setSecondPersonName] = useState<string>('Person 2');
    const [secondReceipts, setSecondReceipts] = useState<IReceipt[]>([]);

    function selectCategory(receiptNum: number, itemNum: number, isFrist: boolean, selectedCategory: Category) {
        const updatedList: IReceipt[] = isFrist ? firstReceipts : secondReceipts;

        updatedList[receiptNum].categoryForAllItems = Category.None;
        updatedList[receiptNum].items[itemNum].category = selectedCategory;

        isFrist ? setFirstReceipts([...updatedList]) : setSecondReceipts([...updatedList]);
    }

    function toggleRejectItem(receiptNum: number, itemNum: number, isFirstList: boolean) {
        const updatedList: IReceipt[] = isFirstList ? firstReceipts : secondReceipts;

        updatedList[receiptNum].isAllRejected = false;
        updatedList[receiptNum].isAllShared = false;
        updatedList[receiptNum].isAllMine = false;

        if (updatedList[receiptNum].items[itemNum].isMine === true) {
            updatedList[receiptNum].items[itemNum].isMine = false;
        };
        updatedList[receiptNum].items[itemNum].isRejected = !updatedList[receiptNum].items[itemNum].isRejected;
        updatedList[receiptNum].items[itemNum].isShared = !updatedList[receiptNum].items[itemNum].isRejected;


        isFirstList ? setFirstReceipts([...updatedList]) : setSecondReceipts([...updatedList]);
    }

    function toggleShareItem(receiptNum: number, itemNum: number, isFirstList: boolean) {
        const updatedList: IReceipt[] = isFirstList ? firstReceipts : secondReceipts;
        updatedList[receiptNum].isAllRejected = false;
        updatedList[receiptNum].isAllShared = false;
        updatedList[receiptNum].isAllMine = false;

        if (updatedList[receiptNum].items[itemNum].isRejected === true && !updatedList[receiptNum].items[itemNum].isShared === true) {
            updatedList[receiptNum].items[itemNum].isRejected = false;
        };
        updatedList[receiptNum].items[itemNum].isShared = !updatedList[receiptNum].items[itemNum].isShared;
        updatedList[receiptNum].items[itemNum].isMine = updatedList[receiptNum].items[itemNum].isShared && updatedList[receiptNum].items[itemNum].isRejected;

        isFirstList ? setFirstReceipts([...updatedList]) : setSecondReceipts([...updatedList]);
    }

    function toggleMyItem(receiptNum: number, itemNum: number, isFirstList: boolean) {
        const updatedList: IReceipt[] = isFirstList ? firstReceipts : secondReceipts;

        updatedList[receiptNum].isAllRejected = false;
        updatedList[receiptNum].isAllShared = false;
        updatedList[receiptNum].isAllMine = false;

        updatedList[receiptNum].items[itemNum].isMine = !updatedList[receiptNum].items[itemNum].isMine;
        updatedList[receiptNum].items[itemNum].isShared = !updatedList[receiptNum].items[itemNum].isMine;
        updatedList[receiptNum].items[itemNum].isRejected = false;

        isFirstList ? setFirstReceipts([...updatedList]) : setSecondReceipts([...updatedList]);
    }

    function deleteItem(receiptNum: number, itemNum: number, isFirstList: boolean) {
        const updatedList: IReceipt[] = isFirstList ? firstReceipts : secondReceipts;

        const deletedItem = updatedList[receiptNum].items.splice(itemNum, 1);
        updatedList[receiptNum].totalPrice -= deletedItem[0].price;

        if (updatedList[receiptNum].totalPrice < 0 && updatedList[receiptNum].items.length === 0) {
            updatedList[receiptNum].totalPrice = 0;
        }

        updatedList[receiptNum].totalPrice = Math.floor(updatedList[receiptNum].totalPrice * 100) / 100;

        isFirstList ? setFirstReceipts([...updatedList]) : setSecondReceipts([...updatedList]);
    }

    function selectCategoryForAllItems(receiptNum: number, isFrist: boolean, selectedCategory: Category) {
        const updatedList: IReceipt[] = isFrist ? firstReceipts.slice(0) : secondReceipts.slice(0);

        updatedList[receiptNum].categoryForAllItems = selectedCategory;

        const tmpItems: IReceiptItem[] = updatedList[receiptNum].items.slice(0);

        tmpItems.forEach((item) => {
            item.category = selectedCategory;
        })

        updatedList[receiptNum].items = tmpItems;

        console.log(updatedList[receiptNum].items[0]);


        isFrist ? setFirstReceipts([...updatedList]) : setSecondReceipts([...updatedList]);
    }

    function toggleAllRejectedItems(receiptNum: number, isFirstList: boolean) {
        const updatedList: IReceipt[] = isFirstList ? firstReceipts : secondReceipts;

        if (updatedList[receiptNum].isAllMine === true) {
            updatedList[receiptNum].isAllMine = false;
        };
        updatedList[receiptNum].isAllRejected = !updatedList[receiptNum].isAllRejected;
        updatedList[receiptNum].isAllShared = !updatedList[receiptNum].isAllRejected;


        updatedList[receiptNum].items.forEach((item) => {
            item.isRejected = updatedList[receiptNum].isAllRejected;
            item.isShared = updatedList[receiptNum].isAllShared;
            item.isMine = updatedList[receiptNum].isAllMine;
        });

        isFirstList ? setFirstReceipts([...updatedList]) : setSecondReceipts([...updatedList]);
    }

    function toggleAllSharedItems(receiptNum: number, isFirstList: boolean) {
        const updatedList: IReceipt[] = isFirstList ? firstReceipts : secondReceipts;

        if (updatedList[receiptNum].isAllRejected === true && !updatedList[receiptNum].isAllShared === true) {
            updatedList[receiptNum].isAllRejected = false;
        };
        updatedList[receiptNum].isAllShared = !updatedList[receiptNum].isAllShared;
        updatedList[receiptNum].isAllMine = updatedList[receiptNum].isAllShared && updatedList[receiptNum].isAllRejected;

        updatedList[receiptNum].items.forEach((item) => {
            item.isRejected = updatedList[receiptNum].isAllRejected;
            item.isShared = updatedList[receiptNum].isAllShared;
            item.isMine = updatedList[receiptNum].isAllMine;
        });

        isFirstList ? setFirstReceipts([...updatedList]) : setSecondReceipts([...updatedList]);
    }

    function toggleAllMyItems(receiptNum: number, isFirstList: boolean) {
        const updatedList: IReceipt[] = isFirstList ? firstReceipts : secondReceipts;

        updatedList[receiptNum].isAllMine = !updatedList[receiptNum].isAllMine;
        updatedList[receiptNum].isAllShared = !updatedList[receiptNum].isAllMine;
        updatedList[receiptNum].isAllRejected = false;

        updatedList[receiptNum].items.forEach((item) => {
            item.isRejected = updatedList[receiptNum].isAllRejected;
            item.isShared = updatedList[receiptNum].isAllShared;
            item.isMine = updatedList[receiptNum].isAllMine;
        });

        isFirstList ? setFirstReceipts([...updatedList]) : setSecondReceipts([...updatedList]);
    }

    function deleteReceipt(receiptNum: number, isFirstList: boolean) {
        const updatedList: IReceipt[] = isFirstList ? firstReceipts : secondReceipts;
        updatedList.splice(receiptNum, 1);
        isFirstList ? setFirstReceipts([...updatedList]) : setSecondReceipts([...updatedList]);
    }

    async function uploadFile(files: FileList | null, isFirst: boolean): Promise<void> {
        if (files !== null && files !== undefined) {
            let receipts: IReceipt[] = [];

            for (let i = 0; i < files.length; i++) {
                receipts = receipts.concat(await CSVParser.parseFileToReceipts(files[i], isFirst ? firstPersonName : secondPersonName));
            }
            if (isFirst) {
                setFirstReceipts([...receipts])
            } else {
                setSecondReceipts([...receipts])
            }
        }
    }

    function setReceipts(receipts: IReceipt[], isFirst: boolean) {
        if (isFirst) {
            setFirstReceipts([...receipts]);
        } else {
            setSecondReceipts([...receipts]);
        }
    }

    return (
        <div className={[styles.receiptManager].join(' ')}>
            <div className={[styles.split].join(' ')}>
                <PersonCard
                    myName={firstPersonName}
                    otherName={secondPersonName}
                    isFirst={true}
                    myReceipts={firstReceipts}
                    otherReceipts={secondReceipts}
                    setPersonName={setFirstPersonName}
                    setReceipts={setReceipts}
                    uploadFile={uploadFile}
                />
                <PersonCard
                    myName={secondPersonName}
                    otherName={firstPersonName}
                    isFirst={false}
                    myReceipts={secondReceipts}
                    otherReceipts={firstReceipts}
                    setPersonName={setSecondPersonName}
                    setReceipts={setReceipts}
                    uploadFile={uploadFile}
                />
            </div>
            {firstReceipts.length !== 0 &&
                <ReceiptsTable
                    myName={firstPersonName}
                    otherName={secondPersonName}
                    isFirst={true}
                    myReceipts={firstReceipts}
                    toggleAllMyItems={toggleAllMyItems}
                    toggleAllSharedItems={toggleAllSharedItems}
                    toggleAllRejectedItems={toggleAllRejectedItems}
                    selectCategoryForAllItems={selectCategoryForAllItems}
                    toggleMyItem={toggleMyItem}
                    toggleSharedItem={toggleShareItem}
                    toggleRejectedItem={toggleRejectItem}
                    deleteReceipt={deleteReceipt}
                    deleteItem={deleteItem}
                    selectCategory={selectCategory}
                />
            }
            {secondReceipts.length !== 0 &&
                <ReceiptsTable
                    myName={secondPersonName}
                    otherName={firstPersonName}
                    isFirst={false}
                    myReceipts={secondReceipts}
                    toggleAllMyItems={toggleAllMyItems}
                    toggleAllSharedItems={toggleAllSharedItems}
                    toggleAllRejectedItems={toggleAllRejectedItems}
                    selectCategoryForAllItems={selectCategoryForAllItems}
                    toggleMyItem={toggleMyItem}
                    toggleSharedItem={toggleShareItem}
                    toggleRejectedItem={toggleRejectItem}
                    deleteReceipt={deleteReceipt}
                    deleteItem={deleteItem}
                    selectCategory={selectCategory}
                />
            }
        </div>
    );
}
