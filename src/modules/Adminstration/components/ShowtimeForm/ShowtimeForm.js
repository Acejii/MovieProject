import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import moment from "moment";
import locale from "antd/es/date-picker/locale/vi_VN";
import useRequest from "hooks/useRequest";
import movieAPI from "apis/movieAPI";
import { useNavigate } from "react-router-dom";

import "./showtimeForm.scss";
import {
  Button,
  DatePicker,
  Form,
  InputNumber,
  Select,
  notification,
} from "antd";
import movieManagementAPI from "apis/movieManagementAPI";

const ShowtimeForm = ({ movie }) => {
  const { Option } = Select;

  const navigate = useNavigate();
  const [cinemaSystemSelected, setCinemaSystemSelected] = useState(null);
  const [cinemas, setCinemas] = useState(null);

  const { data: cinemaSystems } = useRequest(movieAPI.getCinemaSystem);

  useEffect(() => {
    if (!cinemaSystemSelected) return;
    const fetchCinemas = async () => {
      try {
        const data = await movieAPI.getCinemaFromSystem(cinemaSystemSelected);
        setCinemas(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCinemas();
  }, [cinemaSystemSelected]);

  const handleChangeSelect = (value) => {
    setCinemaSystemSelected(value);
  };

  const { handleSubmit, control } = useForm({
    defaultValues: {
      maPhim: movie?.maPhim,
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: 0,
    },
    mode: "onTouched",
  });

  const onSubmit = async (values) => {
    // format day before submit
    const dateConfig = moment(values.ngayChieuGioChieu).format(
      "DD-MM-YYYY HH:mm:ss"
    );
    values = { ...values, ngayChieuGioChieu: dateConfig };

    try {
      await movieManagementAPI.movieShowtime(values);
      notification.success({
        message: "Tạo lịch chiếu thành công",
      });
      navigate("/admin/movie");
    } catch (error) {
      notification.error({
        message: "Tạo lịch chiếu thất bại",
        description: error,
      });
    }
  };

  return (
    <div className="showtimeWrapper">
      <div className="showtime__movie">
        <img src={movie?.hinhAnh} alt="HinhAnh" width="80px" />
        <h2 className="name">{movie?.tenPhim}</h2>
      </div>
      {/* Form */}
      <div className="showtime__form">
        <Form
          onFinish={handleSubmit(onSubmit)}
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
        >
          {/* Hệ thống rạp */}
          <Form.Item
            name="heThongRap"
            label="Hệ thống rạp"
            rules={[
              {
                required: true,
                message: "Không được để trống",
              },
            ]}
          >
            <Select
              placeholder="Chọn hệ thống rạp"
              onChange={handleChangeSelect}
              allowClear
            >
              {cinemaSystems?.map((cinemaSystem, index) => (
                <Option key={index} value={cinemaSystem.maHeThongRap}>
                  {cinemaSystem.maHeThongRap}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Cụm rạp */}
          <Controller
            name="maRap"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Không được để trống",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <Form.Item
                label="Cụm rạp"
                validateStatus={error ? "error" : ""}
                help={error?.message}
              >
                <Select {...field} placeholder="Chọn cụm rạp" allowClear>
                  {cinemas?.map((cinema, index) => (
                    <Option key={index} value={cinema.maCumRap}>
                      {cinema.tenCumRap}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            )}
          />
          {/*Ngày chiếu  */}
          <Controller
            name="ngayChieuGioChieu"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Không được để trống",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <Form.Item
                label="Ngày chiếu giờ chiếu"
                validateStatus={error ? "error" : ""}
                help={error?.message}
              >
                <DatePicker
                  showTime
                  format="DD/MM/YYYY HH:mm:ss"
                  {...field}
                  locale={locale}
                />
              </Form.Item>
            )}
          />

          {/*Đánh giá  */}
          <Controller
            name="giaVe"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Không được để trống",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <Form.Item
                label="Giá vé"
                validateStatus={error ? "error" : ""}
                help={error?.message}
              >
                <InputNumber type="text" {...field} />
              </Form.Item>
            )}
          />
          <Form.Item wrapperCol={{ offset: 3, span: 14 }}>
            <Button type="primary" htmlType="submit">
              Tạo lịch chiếu
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ShowtimeForm;
