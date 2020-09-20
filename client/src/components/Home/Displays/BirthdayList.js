import React, { useEffect, useState } from "react";

import { getApi } from "../../../bin/callApi";
import moment from "moment";

import { Table } from "antd";

const BirthdayList = () => {
  const [bMonths, setbMonths] = useState([]);
  const [monthBirthdays, setMonthBirthdays] = useState([]);
  const [nextBirthdays, setNextBirthdays] = useState([]);
  const [todayBirthdays, setTodayBirthdays] = useState([]);

  const date = new Date();
  const thisMonth = date.getMonth();

  const filterMonthBirthdays = (data) => {
    [1, 2, 3].forEach((each) => {
      const filtered = data.filter((client) => {
        const clientBirthday = client.birthday
          ? new Date(client.birthday)
          : undefined;
        const clientBMonth = clientBirthday && clientBirthday.getMonth();
        const clientBDay = clientBirthday && clientBirthday.getDay();

        const thisDay = date.getDay();

        return each === 1
          ? clientBMonth === thisMonth
          : each === 2
          ? clientBMonth === thisMonth + 1
          : clientBMonth === thisMonth && clientBDay === thisDay;
      });
      each === 1
        ? setMonthBirthdays(filtered)
        : each === 2
        ? setNextBirthdays(filtered)
        : setTodayBirthdays(filtered);
    });
  };

  useEffect(() => {
    getApi("/clients/findBirthdays").then((data) => {
      data.forEach((client) => {
        const date = client.birthday;

        client.formatedBirthday = moment(date).format("DD/MM/YYYY");
      });

      setbMonths(data);
      filterMonthBirthdays(data);
    });
  }, []);

  console.log(bMonths);
  console.log(monthBirthdays);
  console.log(nextBirthdays);

  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const columns = [
    { title: "Nome", dataIndex: "name", key: "name" },
    { title: "Data", dataIndex: "formatedBirthday", key: "birthday" },
  ];

  return (
    <div>
      {[1, 2, 3].map((table, index) => {
        return (
          <div key={index}>
            <p>
              {table === 1
                ? "Aniversáriantes de Hoje"
                : table === 2
                ? `Aniversáriantes de ${months[thisMonth]}`
                : `Aniversáriantes de ${months[thisMonth + 1]}`}
            </p>
            <Table
              columns={columns}
              dataSource={
                table === 1
                  ? todayBirthdays
                  : table === 2
                  ? monthBirthdays
                  : nextBirthdays
              }
              pagination={false}
              className="list"
              rowKey={"_id"}
            />
          </div>
        );
      })}
    </div>
  );
};

export default BirthdayList;
