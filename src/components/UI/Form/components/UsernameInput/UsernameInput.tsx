import React, { useEffect, FC, ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateSelfMutation } from '../../../../../API/mutation/updateSelf/updateSelf';
import { getGQLErrorMessage, useDebounce } from '../../../../../utils/functions';
import { useIsUsernameUniqueLazyQuery } from '../../../../../API/query/isUsernameUnique/isUsernameUnique';
import { pushToast } from '../../../../../modules/Toast';
import SearchInput from '../SearchInput/SearchInput';
import Toast from '../../../Toast/Toast';
import { updateStoredGetSelf } from '../../../../../utils/userFunctions';

export interface UsernameInputProps {
  onCompleted: () => void;
  children: (args: {
    disabled: boolean;
    mutationLoading: boolean;
    queryLoading: boolean;
    onSubmit: () => void;
  }) => ReactNode;
}

type FormData = {
  username: string;
};

const UsernameInput: FC<UsernameInputProps> = (props) => {
  const { register, setValue, handleSubmit, errors, formState: { dirty }, setError, clearError } = useForm<FormData>({ mode: 'onChange' });


  /**
   * isUsernameUnique query
   */
  const [query, queryResult] = useIsUsernameUniqueLazyQuery({
    onCompleted: ({ isUsernameUnique }) => {
      /**
       * Set and clear error on completed
       */
      if (!isUsernameUnique) {
        setError('username', 'message', 'Username is already taken');
      } else {
        clearError('username');
      }
    },
    onError: () => {
      /**
       * Set error message
       */
      setError('username', 'message', 'Something went wrong');
    },
  });
  const { loading: queryLoading } = queryResult;


  /**
   * Register form
   */
  useEffect(() => {
    register(
      { name: 'username' },
      { required: true,
        validate: (v) => {
          /**
           * Validate username and return error messages to show
           */
          if (!/^.{3,}$/.test(v)) {
            return 'Username must be 3 characters or more';
          }


          /**
           * If this validation does not match the variables in the last request
           * Then the request is in process, return false
           */
          if (queryResult.variables?.username !== v) {
            return 'DO_NOT_DISPLAY';
          }


          /**
           * If query has returned and is false, then persist this error
           */
          if (queryResult.data?.isUsernameUnique === false) {
            return 'Username is alrady taken';
          }

          return true;
        } },
    );
  }, [register, queryResult]);


  /**
   * Update self mutation
   */
  const [mutation, { loading: mutationLoading }] = useUpdateSelfMutation({
    onCompleted: () => {
      updateStoredGetSelf();
      props.onCompleted();
    },
    onError: (e) => {
      pushToast({
        duration: 1000,
        component: (
          <Toast
            type="ERROR"
            content={getGQLErrorMessage(e)}
          />
        ),
        dismissible: false,
      });
    },
  });


  /**
   * Function to debounce the variables state
   * Any values passed to it will be merged into setVariables with current variables
   */
  const debounceName = useDebounce((username) => {
    query({
      variables: {
        username,
      },
    });
  }, 500, []);


  /**
   * Submit
   */
  const onSubmit = (variables: FormData) => {
    mutation({
      variables,
    });
  };


  return (
    <>
      <SearchInput
        name="username"
        onChangeText={(text) => {
          // Validate on change
          setValue('username', text, true);

          // Debounce isUniqueUsername request if the length of name is valid
          if (text && text.length >= 3) {
            debounceName(text);
          }
        }}
        placeholder="Enter username"
        autoCompleteType="username"
        autoCapitalize="none"
        returnKeyType="done"
        errors={errors}
        onSubmitEditing={handleSubmit(onSubmit)}
        loading={queryLoading}
      />

      {props.children({
        disabled: !!errors.username || !dirty,
        mutationLoading,
        queryLoading,
        onSubmit: handleSubmit(onSubmit),
      })}
    </>
  );
};

export default UsernameInput;
