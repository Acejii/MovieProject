import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import movieManagementAPI from "apis/movieManagementAPI";
import moment from "moment/moment";
import locale from "antd/es/date-picker/locale/vi_VN";
import { useNavigate } from "react-router-dom";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  notification,
  Radio,
  Switch,
} from "antd";
import "./userForm.scss";

const UserForm = ({ user }) => {
  const [componentSize, setComponentSize] = useState("default");
  const [imgPreview, setImgPreview] = useState("");
  const navigate = useNavigate();

  const dateConfig = user?.ngayKhoiChieu.slice(0, 10);

  useEffect(() => {
    if (user && user.hinhAnh) setImgPreview(user.hinhAnh);
  }, [user]);

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const { handleSubmit, control, setValue } = useForm({
    defaultValues: {
      tenPhim: user?.tenPhim || "",
      biDanh: user?.biDanh || "",
      trailer: user?.trailer || "",
      hinhAnh: user?.hinhAnh || "",
      moTa: user?.moTa || "",
      ngayKhoiChieu: moment(dateConfig || new Date()),
      sapChieu: user?.sapChieu || false,
      dangChieu: user?.dangChieu || false,
      hot: user?.hot || false,
      danhGia: user?.danhGia || "",
      maNhom: user?.maNhom || "GP04",
    },
    mode: "onTouched",
  });

  const handleChangeImg = (evt) => {
    const file = evt.target.files[0];

    if (!file) return;

    // Lưu file vào field hinhAnh của hook form
    setValue("hinhAnh", file);

    // Xử lý hiển thị hình ảnh ra giao diện
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file); // bất đồng bộ
    fileReader.onload = (evt) => {
      // Đọc file thành công
      // evt.target.result: string base64
      setImgPreview(evt.target.result);
    };
  };

  const onSubmit = async (values) => {
    const date = moment(values.ngayKhoiChieu).format("DD/MM/YYYY");

    // Create form data
    let formData = new FormData();
    formData.append("tenPhim", values.tenPhim);
    formData.append("biDanh", values.biDanh);
    formData.append("hinhAnh", values.hinhAnh);
    formData.append("trailer", values.trailer);
    formData.append("moTa", values.moTa);
    formData.append("ngayKhoiChieu", date);
    formData.append("sapChieu", values.sapChieu);
    formData.append("dangChieu", values.dangChieu);
    formData.append("hot", values.hot);
    formData.append("danhGia", values.danhGia);
    formData.append("maNhom", values.maNhom);

    if (user && user.maPhim) {
      try {
        await movieManagementAPI.updateMovie(formData);
        notification.success({
          message: "Cập nhật thành công",
        });
        navigate("/admin/movie");
      } catch (error) {
        notification.error({
          message: "Cập nhật thất bại",
          description: "error",
        });
      }
    } else {
      try {
        await movieManagementAPI.addMovie(formData);
        notification.success({
          message: "Thêm phim thành công",
        });
        navigate("/admin/movie");
      } catch (error) {
        notification.error({
          message: "Thêm phim thất bại",
          description: "error",
        });
      }
    }
  };

  return (
    <>
      {/* Form */}
      <Form
        onFinish={handleSubmit(onSubmit)}
        labelCol={{
          span: 3,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
        <Form.Item label="Kích thước" name="size">
          <Radio.Group>
            <Radio.Button value="small">Nhỏ</Radio.Button>
            <Radio.Button value="default">Vừa</Radio.Button>
            <Radio.Button value="large">Lớn</Radio.Button>
          </Radio.Group>
        </Form.Item>

        {/* Tên phim */}
        <Controller
          name="tenPhim"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Tên phim không được để trống",
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <Form.Item
              label="Tên phim"
              validateStatus={error ? "error" : ""}
              help={error?.message}
            >
              <Input type="text" {...field} />
            </Form.Item>
          )}
        />

        {/* Bí danh */}
        <Controller
          name="biDanh"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Bí danh không được để trống",
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <Form.Item
              label="Bí danh"
              validateStatus={error ? "error" : ""}
              help={error?.message}
            >
              <Input type="text" {...field} />
            </Form.Item>
          )}
        />

        {/* img */}
        <Controller
          name="hinhAnh"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Hình ảnh không được để trống",
            },
          }}
          render={({ field: { ref }, fieldState: { error } }) => (
            <Form.Item
              label="Hình ảnh"
              validateStatus={error ? "error" : ""}
              help={error?.message}
            >
              <input
                ref={ref}
                type="file"
                accept="image/png, image/jpeg"
                name="file"
                id="file"
                onChange={handleChangeImg}
              />
              {imgPreview && (
                <img
                  style={{ marginTop: "10px", width: "100px" }}
                  src={imgPreview}
                  alt="preview"
                />
              )}
            </Form.Item>
          )}
        />

        {/*Trailer  */}
        <Controller
          name="trailer"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Trailer không được để trống",
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <Form.Item
              label="Trailer"
              validateStatus={error ? "error" : ""}
              help={error?.message}
            >
              <Input type="text" {...field} />
            </Form.Item>
          )}
        />
        {/*Mô tả  */}
        <Controller
          name="moTa"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Mô tả không được để trống",
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <Form.Item
              label="Mô tả"
              validateStatus={error ? "error" : ""}
              help={error?.message}
            >
              <Input type="text" {...field} />
            </Form.Item>
          )}
        />
        {/*Ngày chiếu  */}
        <Controller
          name="ngayKhoiChieu"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Chưa chọn ngày khởi chiếu phim",
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <Form.Item
              label="Ngày khởi chiếu"
              validateStatus={error ? "error" : ""}
              help={error?.message}
            >
              <DatePicker {...field} locale={locale} format="DD/MM/YYYY" />
            </Form.Item>
          )}
        />

        {/* Đang chiếu */}
        <Controller
          name="dangChieu"
          control={control}
          render={({ field: { onChange, value, name, ref } }) => (
            <Form.Item label="Đang chiếu">
              <Switch
                onChange={onChange}
                checked={value}
                ref={ref}
                name={name}
              />
            </Form.Item>
          )}
        />
        {/*Sắp chiếu  */}
        <Controller
          name="sapChieu"
          control={control}
          render={({ field: { onChange, value, name, ref } }) => (
            <Form.Item label="Sắp chiếu">
              <Switch
                onChange={onChange}
                checked={value}
                ref={ref}
                name={name}
              />
            </Form.Item>
          )}
        />

        {/*Hot */}
        <Controller
          name="hot"
          control={control}
          render={({ field: { onChange, value, name, ref } }) => (
            <Form.Item label="Hot">
              <Switch
                checked={value}
                onChange={onChange}
                ref={ref}
                name={name}
              />
            </Form.Item>
          )}
        />
        {/*Đánh giá  */}
        <Controller
          name="danhGia"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Đánh giá không được để trống",
            },
            min: {
              value: 1,
              message: "Đánh giá phải trong khoảng 1 đến 10 sao",
            },
            max: {
              value: 10,
              message: "Đánh giá phải trong khoảng 1 đến 10 sao",
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <Form.Item
              label="Đánh giá"
              validateStatus={error ? "error" : ""}
              help={error?.message}
            >
              <InputNumber type="text" {...field} />
            </Form.Item>
          )}
        />
        <Form.Item wrapperCol={{ offset: 3, span: 14 }}>
          <Button type="primary" htmlType="submit">
            {user ? "Cập nhật" : "Thêm phim"}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default UserForm;
