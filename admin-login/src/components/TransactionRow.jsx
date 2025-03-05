import React, { useState } from "react";

const TransactionRow = ({ id, customer, items, amount, initialStatus }) => {
  const [status, setStatus] = useState(initialStatus);
  const [isManageVisible, setIsManageVisible] = useState(false);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setIsManageVisible(false); // Hide the popup after changing status
  };

  return (
    <tr>
      <td>{id}</td>
      <td>{customer}</td>
      <td>{items}</td>
      <td>{amount}</td>
      <td className={`status ${status.toLowerCase().replace(" ", "-")}`}>
        {status}
      </td>
      <td className="manage">
        <button
          className="manage-btn"
          onClick={() => setIsManageVisible(!isManageVisible)}
        >
          Manage
        </button>
        {isManageVisible && (
          <div className="manage-status-btns">
            <button
              className="approve-btn"
              onClick={() => handleStatusChange("Pending")}
            >
              Approve
            </button>
            <button
              className="start-delivery-btn"
              onClick={() => handleStatusChange("In Delivery")}
            >
              Start Delivery
            </button>
            <button
              className="set-complete-btn"
              onClick={() => handleStatusChange("Delivered")}
            >
              Set Complete
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default TransactionRow;