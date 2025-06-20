import { useState, useEffect } from "react";
import {
  Form,
  Input,
  Modal,
  Upload,
  Button,
  Radio,
  message,
  InputNumber,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  useCreateTeamMutation,
  useUpdateTeamMutation,
} from "../../../redux/apiSlices/team";
import { getImageUrl } from "../../../utils/baseUrl";

const { TextArea } = Input;

function AddEditTeamMember({
  isModalOpen,
  handleOk,
  handleCancel,
  editData = null, // Pass the team member data when editing
  isEdit = false, // Boolean to determine if it's edit mode
}) {
  const [form] = Form.useForm();
  const [selectedRole, setSelectedRole] = useState("authority");
  const [loading, setLoading] = useState(false);

  const [createTeam] = useCreateTeamMutation();
  const [updateTeam] = useUpdateTeamMutation();

  // Effect to populate form when editing
  useEffect(() => {
    if (isEdit && editData) {
      // Convert teamRole to lowercase for the form
      const roleValue = editData.teamRole
        ? editData.teamRole.toLowerCase()
        : "authority";

      form.setFieldsValue({
        name: editData.name,
        designation: editData.designation,
        teamRole: roleValue, // Use lowercase value for form
        description: editData.teamDescription || editData.description,
        phone: editData.phone,
      });
      // Set the local state for role
      setSelectedRole(roleValue);
    } else {
      // Reset form for add mode
      form.resetFields();
      form.setFieldsValue({ teamRole: "authority" });
      setSelectedRole("authority");
    }
  }, [isEdit, editData, form]);

  const onFinish = async (values) => {
    setLoading(true);

    try {
      const formData = new FormData();

      const data = {
        name: values.name,
        designation: values.designation,
        teamRole: values.teamRole.toUpperCase(),
        teamDescription: values.description || "",
        phone: values.phone.toString(),
      };

      formData.append("data", JSON.stringify(data));

      const fileList = values.image;
      if (fileList && fileList.length > 0) {
        const file = fileList[0];
        if (file.originFileObj) {
          formData.append("image", file.originFileObj);
        }
      }

      // 🔍 Log formData if editing
      if (isEdit) {
        console.log("FormData being sent (edit mode):");
        for (let pair of formData.entries()) {
          console.log(`${pair[0]}:`, pair[1]);
        }
      }

      let res;
      if (isEdit) {
        res = await updateTeam({
          id: editData.id,
          updatedData: formData,
        }).unwrap();
      } else {
        res = await createTeam(formData).unwrap();
      }

      if (res.success) {
        message.success(
          isEdit
            ? "Team member updated successfully"
            : "Team member added successfully"
        );
        form.resetFields();
        setSelectedRole("authority");
        handleOk();
      } else {
        message.error(
          isEdit ? "Failed to update team member" : "Failed to add team member"
        );
      }
    } catch (error) {
      console.error(
        isEdit
          ? "Failed to update team member:"
          : "Failed to create team member:",
        error
      );
      message.error(
        isEdit ? "Failed to update team member" : "Failed to add team member"
      );
    } finally {
      setLoading(false);
    }
  };

  const onCancel = () => {
    form.resetFields();
    setSelectedRole("authority");
    handleCancel();
  };

  // Handle role change
  const handleRoleChange = (e) => {
    const newRole = e.target.value;
    setSelectedRole(newRole);
    form.setFieldsValue({ teamRole: newRole }); // Fix: Use teamRole instead of role
  };

  // Prepare initial file list for edit mode
  const getInitialFileList = () => {
    if (isEdit && editData && editData.image) {
      return [
        {
          uid: "-1",
          name: "Current Image",
          status: "done",
          url: `${getImageUrl}${editData.image}`, // Assuming editData.image contains the image URL
        },
      ];
    }
    return [];
  };

  return (
    <Modal
      title={
        <span className="text-lg font-semibold">
          {isEdit ? "Edit Team Member" : "Add New Team Member"}
        </span>
      }
      open={isModalOpen}
      footer={null}
      onCancel={onCancel}
      width={600}
      closeIcon={<span className="text-xl text-green-500">×</span>}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="pt-2"
        initialValues={{ teamRole: "authority" }}
        // preserve={false} // Add this to ensure form doesn't preserve old values
        onValuesChange={(changedValues, allValues) => {
          // Optional: Log to debug what's changing
          console.log("Form values changed:", changedValues, allValues);
        }}
      >
        <Form.Item
          label="Role"
          name="teamRole"
          rules={[{ required: true, message: "Please select a role" }]}
        >
          <Radio.Group onChange={handleRoleChange} value={selectedRole}>
            <Radio value="authority">Authority</Radio>
            <Radio value="member">Member</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter name" }]}
        >
          <Input placeholder="Enter name" />
        </Form.Item>

        <Form.Item
          label="Designation"
          name="designation"
          rules={[{ required: true, message: "Please enter designation" }]}
        >
          <Input placeholder="Enter designation" />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[{ required: true, message: "Please enter Phone Number" }]}
        >
          <Input placeholder="+3557 000 447" className="min-w-60" />
        </Form.Item>
        <Form.Item
          label="Image"
          name="image"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          rules={[
            {
              required: !isEdit, // Only required for new entries
              message: "Please upload an image",
            },
          ]}
        >
          <Upload
            beforeUpload={() => false}
            accept="image/*"
            maxCount={1}
            listType="picture"
            defaultFileList={getInitialFileList()}
          >
            <Button icon={<UploadOutlined />}>
              {isEdit ? "Change Image" : "Choose File"}
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: selectedRole === "authority",
              message: "Please enter description",
            },
          ]}
        >
          <TextArea
            rows={3}
            placeholder={
              selectedRole === "authority"
                ? "Enter authority description"
                : "Enter member description (optional)"
            }
          />
        </Form.Item>

        <Form.Item>
          <Button
            htmlType="submit"
            loading={loading}
            className="w-full text-white bg-[#00C853] hover:bg-[#00b34a] border-none"
            size="large"
          >
            {loading
              ? isEdit
                ? "Updating..."
                : "Adding..."
              : isEdit
              ? "Update Team Member"
              : "Add Team Member"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddEditTeamMember;
