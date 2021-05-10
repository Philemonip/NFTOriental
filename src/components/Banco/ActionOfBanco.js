import { Tabs, Tab } from "react-bootstrap";
import DepositOfBanco from "./DepositOfBanco";
import TransferCCHOfBanco from "./TransferCCHOfBanco";
import WithdrawOfBanco from "./WithdrawOfBanco";

const ActionOfBanco = ({ deposit, withdraw, transferCCH }) => {
	return (
		<div className="col bancoAction">
			<div className="row">
				<main role="main" className="col-lg-12 d-flex text-center">
					<div className="content mr-auto ml-auto ">
						<Tabs className="bancoActionTabs" defaultActiveKey="deposit">
							<Tab className="tabDetail" eventKey="deposit" title="Deposit">
								<DepositOfBanco deposit={deposit} />
							</Tab>
							<Tab className="tabDetail" eventKey="withdraw" title="Withdraw">
								<WithdrawOfBanco withdraw={withdraw} />
							</Tab>
							<Tab
								className="tabDetail"
								eventKey="transferCCH"
								title="Transfer CCH"
							>
								<TransferCCHOfBanco transferCCH={transferCCH} />
							</Tab>
						</Tabs>
					</div>
				</main>
			</div>
		</div>
	);
};

export default ActionOfBanco;
