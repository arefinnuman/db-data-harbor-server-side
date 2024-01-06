"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TerminalValidation = void 0;
const zod_1 = require("zod");
const createTerminalZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        terminalType: zod_1.z.string({
            required_error: 'Terminal type is required',
        }),
        terminalId: zod_1.z.string({
            required_error: 'Terminal id is required',
        }),
        terminalNameAndId: zod_1.z.string({
            required_error: 'Terminal name and id is required',
        }),
        terminalStatus: zod_1.z.string({
            required_error: 'Terminal status is required',
        }),
        terminalBrand: zod_1.z.string({
            required_error: 'Terminal brand is required',
        }),
        terminalModel: zod_1.z.string({
            required_error: 'Terminal model is required',
        }),
        glNumber: zod_1.z.string({
            required_error: 'GL number is required',
        }),
        glCode: zod_1.z.string({
            required_error: 'GL code is required',
        }),
        numberOfBpm: zod_1.z.any().optional(),
        insuranceLimit: zod_1.z.any().optional(),
        assetTagSerial: zod_1.z.string({
            required_error: 'Asset tag serial is required',
        }),
        deploymentDate: zod_1.z.string({
            required_error: 'Deployment date is required',
        }),
        liveDate: zod_1.z.string({
            required_error: 'Live date is required',
        }),
        monthlyNoOfTransaction: zod_1.z.any().optional(),
        monthlyVolOfTransaction: zod_1.z.any().optional(),
        monthlyAvgNoOfTxn: zod_1.z.any().optional(),
        monthlyAvgVolOfTxn: zod_1.z.any().optional(),
        custodiansKey: zod_1.z.object({
            name: zod_1.z.string({
                required_error: 'Name is required',
            }),
            contactNumber: zod_1.z.string({
                required_error: 'Contact number is required',
            }),
        }),
        custodiansCom: zod_1.z.object({
            name: zod_1.z.string({
                required_error: 'Name is required',
            }),
            contactNumber: zod_1.z.string({
                required_error: 'Contact number is required',
            }),
        }),
    }),
});
const updateTerminalZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        terminalType: zod_1.z
            .string({
            required_error: 'Terminal type is required',
        })
            .optional(),
        terminalId: zod_1.z
            .string({
            required_error: 'Terminal id is required',
        })
            .optional(),
        terminalNameAndId: zod_1.z
            .string({
            required_error: 'Terminal name and id is required',
        })
            .optional(),
        terminalStatus: zod_1.z
            .string({
            required_error: 'Terminal status is required',
        })
            .optional(),
        terminalBrand: zod_1.z
            .string({
            required_error: 'Terminal brand is required',
        })
            .optional(),
        terminalModel: zod_1.z
            .string({
            required_error: 'Terminal model is required',
        })
            .optional(),
        glNumber: zod_1.z
            .string({
            required_error: 'GL number is required',
        })
            .optional(),
        glCode: zod_1.z
            .string({
            required_error: 'GL code is required',
        })
            .optional(),
        insuranceLimit: zod_1.z
            .any({
            required_error: 'Insurance limit is required',
        })
            .optional(),
        assetTagSerial: zod_1.z
            .string({
            required_error: 'Asset tag serial is required',
        })
            .optional(),
        deploymentDate: zod_1.z
            .string({
            required_error: 'Deployment date is required',
        })
            .optional(),
        liveDate: zod_1.z
            .string({
            required_error: 'Live date is required',
        })
            .optional(),
        monthlyNoOfTransaction: zod_1.z
            .any({
            required_error: 'Monthly no of transaction is required',
        })
            .optional(),
        monthlyVolOfTransaction: zod_1.z
            .any({
            required_error: 'Monthly vol of transaction is required',
        })
            .optional(),
        monthlyAvgNoOfTxn: zod_1.z
            .any({
            required_error: 'Monthly avg no of txn is required',
        })
            .optional(),
        monthlyAvgVolOfTxn: zod_1.z
            .any({
            required_error: 'Monthly avg vol of txn is required',
        })
            .optional(),
        custodiansKey: zod_1.z.object({
            name: zod_1.z
                .string({
                required_error: 'Name is required',
            })
                .optional(),
            contactNumber: zod_1.z
                .string({
                required_error: 'Contact number is required',
            })
                .optional(),
        }),
        custodiansCom: zod_1.z.object({
            name: zod_1.z
                .string({
                required_error: 'Name is required',
            })
                .optional(),
            contactNumber: zod_1.z
                .string({
                required_error: 'Contact number is required',
            })
                .optional(),
        }),
    }),
});
exports.TerminalValidation = {
    createTerminalZodSchema,
    updateTerminalZodSchema,
};
