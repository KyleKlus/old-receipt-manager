/** @format */
import styles from '@/styles/components/receipt-manager/personCell/ReceiptsOverview.module.css';

export default function ReceiptsOverview(props: {
    myName: string,
    otherName: string,
    myReceiptsExpenses: number;

    myItemsFromMe: number;
    sharedFromMe: number;
    myExpensesFromMe: number;

    myItemsFromOther: number;
    sharedFromOther: number;
    myExpensesFromOther: number

    myTotalExpenses: number;

    rejectedFromMe: number;

    result: number,
}) {
    const {
        myName,
        otherName,
        myReceiptsExpenses,

        myItemsFromMe,
        sharedFromMe,
        myExpensesFromMe,

        myItemsFromOther,
        sharedFromOther,
        myExpensesFromOther,

        myTotalExpenses,

        rejectedFromMe,

        result,
    } = props;

    return (
        <div className={[styles.receiptsOverview].join(' ')}>
            {/* <div className={[styles.personTableHorizontalSplit].join(' ')}>
                <div className={[styles.personTableSplit].join(' ')}>
                    <div className={[styles.personTableSplitHeader].join(' ')}>{myName}&#39;s Receipts</div>
                    <hr />
                    <div className={[styles.personTableSum].join(' ')}>
                        <div>Personal items: </div>
                        <div>{myItemsFromMe} €</div>
                    </div>
                    <div className={[styles.personTableSum].join(' ')}>
                        <div>Shared items: </div>
                        <div>{sharedFromMe} €</div>
                    </div>
                    <hr />
                    <hr />
                    <div className={[styles.personTableSum].join(' ')}>
                        <div>Expenses: </div>
                        <div>{myExpensesFromMe} €</div>
                    </div>
                </div>
                <div className={[styles.personTableSplit].join(' ')}>
                    <div className={[styles.personTableSplitHeader].join(' ')}>{otherName}&#39;s Receipts</div>
                    <hr />
                    <div className={[styles.personTableSum].join(' ')}>
                        <div>Personal items: </div>
                        <div>{myItemsFromOther} €</div>
                    </div>
                    <div className={[styles.personTableSum].join(' ')}>
                        <div>Shared items: </div>
                        <div>{sharedFromOther} €</div>
                    </div>
                    <hr />
                    <hr />
                    <div className={[styles.personTableSum].join(' ')}>
                        <div>Expenses: </div>
                        <div>{myExpensesFromOther} €</div>
                    </div>
                </div>
            </div>
            <hr /> */}
            <hr />
            <div className={[styles.personTableSum].join(' ')}>
                <div>{myName}&#39;s total expenses: </div>
                <div>{-myTotalExpenses} €</div>
            </div>
            <div className={[styles.personTableSum].join(' ')}>
                <div>{myName} paid: </div>
                <div>{myReceiptsExpenses} €</div>
            </div>
            <hr />
            <div className={[styles.personTableSum].join(' ')}>
                <div>Total result: </div>
                <div>{-result} €</div>
            </div>
            <hr />
            <hr />
            <div className={[styles.personTableSum].join(' ')}>
                {result <= 0
                    ? <div>{myName} has paid too much: </div>
                    : <div>{myName} needs to pay: </div>
                }
                <div>{Math.abs(result)} €</div>
            </div>
            <hr />
        </div>
    );
}
