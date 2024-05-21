import { useFormik } from "formik";

export function useFormikValidation(mutation,schema,initialValues){
    return useFormik({
      initialValues: initialValues,
      validationSchema: schema,
      onSubmit: async (values) => {
        if (!mutation.isLoading) {
          try {
            await mutation.mutateAsync(values);
          } catch (error) {
            // error here
          }
        }
      },
    });
  };