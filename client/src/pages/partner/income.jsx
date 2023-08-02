import { Container, Table } from "react-bootstrap";
import Header from "../../components/header";

import { useQuery } from "react-query";
import { API } from "../../config/api";

function Income() {
  let { data: transaction } = useQuery("transactionCache", async () => {
    const response = await API.get("/partner-transaction");
    console.log("ini trannnn", response);
    return response.data.data;
  });

  return (
    <div>
      <Container>
        <h2 className="mt-5">Income Transaction</h2>
        <Table striped bordered hover className="my-5">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Address</th>
              <th>Product Order</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transaction?.map((data, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{data?.buyer.fullname}</td>
                <td></td>
                <td>{data?.cart[0]?.product.title}</td>
                <td>{data?.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default Income;
