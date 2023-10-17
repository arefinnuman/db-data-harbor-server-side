import { z } from 'zod';

const createTerminalZodSchema = z.object({
  body: z.object({
    terminalType: z.string({
      required_error: 'Terminal type is required',
    }),
    terminalId: z.string({
      required_error: 'Terminal id is required',
    }),
    terminalNameAndId: z.string({
      required_error: 'Terminal name and id is required',
    }),
    terminalStatus: z.string({
      required_error: 'Terminal status is required',
    }),
    terminalBrand: z.string({
      required_error: 'Terminal brand is required',
    }),
    terminalModel: z.string({
      required_error: 'Terminal model is required',
    }),
    glNumber: z.string({
      required_error: 'GL number is required',
    }),
    glCode: z.string({
      required_error: 'GL code is required',
    }),
    numberOfBpm: z.any().optional(),
    insuranceLimit: z.any().optional(),
    assetTagSerial: z.string({
      required_error: 'Asset tag serial is required',
    }),
    deploymentDate: z.string({
      required_error: 'Deployment date is required',
    }),
    liveDate: z.string({
      required_error: 'Live date is required',
    }),
    monthlyNoOfTransaction: z.any().optional(),
    monthlyVolOfTransaction: z.any().optional(),
    monthlyAvgNoOfTxn: z.any().optional(),
    monthlyAvgVolOfTxn: z.any().optional(),
    custodiansKey: z.object({
      name: z.string({
        required_error: 'Name is required',
      }),
      contactNumber: z.string({
        required_error: 'Contact number is required',
      }),
    }),
    custodiansCom: z.object({
      name: z.string({
        required_error: 'Name is required',
      }),
      contactNumber: z.string({
        required_error: 'Contact number is required',
      }),
    }),
  }),
});

const updateTerminalZodSchema = z.object({
  body: z.object({
    terminalType: z
      .string({
        required_error: 'Terminal type is required',
      })
      .optional(),
    terminalId: z
      .string({
        required_error: 'Terminal id is required',
      })
      .optional(),
    terminalNameAndId: z
      .string({
        required_error: 'Terminal name and id is required',
      })
      .optional(),
    terminalStatus: z
      .string({
        required_error: 'Terminal status is required',
      })
      .optional(),
    terminalBrand: z
      .string({
        required_error: 'Terminal brand is required',
      })
      .optional(),
    terminalModel: z
      .string({
        required_error: 'Terminal model is required',
      })
      .optional(),
    glNumber: z
      .string({
        required_error: 'GL number is required',
      })
      .optional(),
    glCode: z
      .string({
        required_error: 'GL code is required',
      })
      .optional(),
    insuranceLimit: z
      .number({
        required_error: 'Insurance limit is required',
      })
      .optional(),
    assetTagSerial: z
      .string({
        required_error: 'Asset tag serial is required',
      })
      .optional(),
    deploymentDate: z
      .string({
        required_error: 'Deployment date is required',
      })
      .optional(),
    liveDate: z
      .string({
        required_error: 'Live date is required',
      })
      .optional(),
    monthlyNoOfTransaction: z
      .number({
        required_error: 'Monthly no of transaction is required',
      })
      .optional(),
    monthlyVolOfTransaction: z
      .number({
        required_error: 'Monthly vol of transaction is required',
      })
      .optional(),
    monthlyAvgNoOfTxn: z

      .number({
        required_error: 'Monthly avg no of txn is required',
      })
      .optional(),
    monthlyAvgVolOfTxn: z
      .number({
        required_error: 'Monthly avg vol of txn is required',
      })
      .optional(),
    custodiansKey: z.object({
      name: z
        .string({
          required_error: 'Name is required',
        })
        .optional(),
      contactNumber: z
        .string({
          required_error: 'Contact number is required',
        })
        .optional(),
    }),
    custodiansCom: z.object({
      name: z
        .string({
          required_error: 'Name is required',
        })
        .optional(),
      contactNumber: z
        .string({
          required_error: 'Contact number is required',
        })
        .optional(),
    }),
  }),
});

export const TerminalValidation = {
  createTerminalZodSchema,
  updateTerminalZodSchema,
};
