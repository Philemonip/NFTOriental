import { Tabs, Tab } from "react-bootstrap";

import DepositOfBanco from "./DepositOfBanco";
import TransferCCHOfBanco from "./TransferCCHOfBanco";
import WithdrawOfBanco from "./WithdrawOfBanco";

const ActionOfBanco = ({ deposit, withdraw, transferCCH }) => {
	return (
		<div className="col">
			<div className="row">
				<main role="main" className="col-lg-12 d-flex text-center">
					<div className="content mr-auto ml-auto">
						<Tabs className="bancoActionTabs" defaultActiveKey="deposit">
							<Tab eventKey="deposit" title="Deposit">
								<DepositOfBanco deposit={deposit} />
							</Tab>
							<Tab eventKey="withdraw" title="Withdraw">
								<WithdrawOfBanco withdraw={withdraw} />
							</Tab>
							<Tab eventKey="transferCCH" title="Transfer CCH">
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
