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
              <th>Product Order</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transaction?.map((data, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{data?.buyer.fullname}</td>
                <td>{data?.cart[0]?.product?.title}</td>
                <td className="p-0">
                  {data.status === "pending" && (
                    <div className="bg-warning text-center rounded mt-3 fw-bold">
                      <p>{data?.status}</p>
                    </div>
                  )}
                  {data.status === "success" && (
                    <div className="bg-success text-center rounded mt-3 fw-bold">
                      <p>{data?.status}</p>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default Income;
