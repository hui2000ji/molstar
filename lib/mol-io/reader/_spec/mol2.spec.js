import { __awaiter, __generator } from "tslib";
import { parseMol2 } from '../mol2/parser';
var Mol2String = "@<TRIPOS>MOLECULE\n5816\n 26 26 0 0 0\nSMALL\nGASTEIGER\n\n@<TRIPOS>ATOM\n      1 O           1.7394   -2.1169   -1.0894 O.3     1  LIG1       -0.3859\n      2 O          -2.2941    1.0781   -1.7979 O.3     1  LIG1       -0.5033\n      3 O          -3.6584    0.5842    0.5722 O.3     1  LIG1       -0.5033\n      4 N           2.6359    1.0243    0.7030 N.3     1  LIG1       -0.3162\n      5 C           1.6787   -1.1447   -0.0373 C.3     1  LIG1        0.0927\n      6 C           0.2684   -0.6866    0.1208 C.ar    1  LIG1       -0.0143\n      7 C           2.6376    0.0193   -0.3576 C.3     1  LIG1        0.0258\n      8 C          -0.3658   -0.0099   -0.9212 C.ar    1  LIG1       -0.0109\n      9 C          -0.4164   -0.9343    1.3105 C.ar    1  LIG1       -0.0524\n     10 C          -1.6849    0.4191   -0.7732 C.ar    1  LIG1        0.1586\n     11 C          -1.7353   -0.5053    1.4585 C.ar    1  LIG1       -0.0162\n     12 C          -2.3696    0.1713    0.4166 C.ar    1  LIG1        0.1582\n     13 C           3.5645    2.1013    0.3950 C.3     1  LIG1       -0.0157\n     14 H           2.0210   -1.6511    0.8741 H       1  LIG1        0.0656\n     15 H           2.3808    0.4742   -1.3225 H       1  LIG1        0.0453\n     16 H           3.6478   -0.3931   -0.4831 H       1  LIG1        0.0453\n     17 H           0.1501    0.1801   -1.8589 H       1  LIG1        0.0659\n     18 H           0.0640   -1.4598    2.1315 H       1  LIG1        0.0622\n     19 H           2.9013    0.5888    1.5858 H       1  LIG1        0.1217\n     20 H          -2.2571   -0.7050    2.3907 H       1  LIG1        0.0655\n     21 H           2.6646   -2.4067   -1.1652 H       1  LIG1        0.2103\n     22 H           3.2862    2.6124   -0.5325 H       1  LIG1        0.0388\n     23 H           4.5925    1.7346    0.3078 H       1  LIG1        0.0388\n     24 H           3.5401    2.8441    1.1985 H       1  LIG1        0.0388\n     25 H          -3.2008    1.2997   -1.5231 H       1  LIG1        0.2923\n     26 H          -3.9690    0.3259    1.4570 H       1  LIG1        0.2923\n@<TRIPOS>BOND\n     1     1     5    1\n     2     1    21    1\n     3     2    10    1\n     4     2    25    1\n     5     3    12    1\n     6     3    26    1\n     7     4     7    1\n     8     4    13    1\n     9     4    19    1\n    10     5     6    1\n    11     5     7    1\n    12     5    14    1\n    13     6     8   ar\n    14     6     9   ar\n    15     7    15    1\n    16     7    16    1\n    17     8    10   ar\n    18     8    17    1\n    19     9    11   ar\n    20     9    18    1\n    21    10    12   ar\n    22    11    12   ar\n    23    11    20    1\n    24    13    22    1\n    25    13    23    1\n    26    13    24    1";
var Mol2StringMultiBlocks = "@<TRIPOS>MOLECULE\n5816\n 26 26 0 0 0\nSMALL\nGASTEIGER\n\n@<TRIPOS>ATOM\n      1 O           1.7394   -2.1169   -1.0894 O.3     1  LIG1       -0.3859\n      2 O          -2.2941    1.0781   -1.7979 O.3     1  LIG1       -0.5033\n      3 O          -3.6584    0.5842    0.5722 O.3     1  LIG1       -0.5033\n      4 N           2.6359    1.0243    0.7030 N.3     1  LIG1       -0.3162\n      5 C           1.6787   -1.1447   -0.0373 C.3     1  LIG1        0.0927\n      6 C           0.2684   -0.6866    0.1208 C.ar    1  LIG1       -0.0143\n      7 C           2.6376    0.0193   -0.3576 C.3     1  LIG1        0.0258\n      8 C          -0.3658   -0.0099   -0.9212 C.ar    1  LIG1       -0.0109\n      9 C          -0.4164   -0.9343    1.3105 C.ar    1  LIG1       -0.0524\n     10 C          -1.6849    0.4191   -0.7732 C.ar    1  LIG1        0.1586\n     11 C          -1.7353   -0.5053    1.4585 C.ar    1  LIG1       -0.0162\n     12 C          -2.3696    0.1713    0.4166 C.ar    1  LIG1        0.1582\n     13 C           3.5645    2.1013    0.3950 C.3     1  LIG1       -0.0157\n     14 H           2.0210   -1.6511    0.8741 H       1  LIG1        0.0656\n     15 H           2.3808    0.4742   -1.3225 H       1  LIG1        0.0453\n     16 H           3.6478   -0.3931   -0.4831 H       1  LIG1        0.0453\n     17 H           0.1501    0.1801   -1.8589 H       1  LIG1        0.0659\n     18 H           0.0640   -1.4598    2.1315 H       1  LIG1        0.0622\n     19 H           2.9013    0.5888    1.5858 H       1  LIG1        0.1217\n     20 H          -2.2571   -0.7050    2.3907 H       1  LIG1        0.0655\n     21 H           2.6646   -2.4067   -1.1652 H       1  LIG1        0.2103\n     22 H           3.2862    2.6124   -0.5325 H       1  LIG1        0.0388\n     23 H           4.5925    1.7346    0.3078 H       1  LIG1        0.0388\n     24 H           3.5401    2.8441    1.1985 H       1  LIG1        0.0388\n     25 H          -3.2008    1.2997   -1.5231 H       1  LIG1        0.2923\n     26 H          -3.9690    0.3259    1.4570 H       1  LIG1        0.2923\n@<TRIPOS>BOND\n     1     1     5    1\n     2     1    21    1\n     3     2    10    1\n     4     2    25    1\n     5     3    12    1\n     6     3    26    1\n     7     4     7    1\n     8     4    13    1\n     9     4    19    1\n    10     5     6    1\n    11     5     7    1\n    12     5    14    1\n    13     6     8   ar\n    14     6     9   ar\n    15     7    15    1\n    16     7    16    1\n    17     8    10   ar\n    18     8    17    1\n    19     9    11   ar\n    20     9    18    1\n    21    10    12   ar\n    22    11    12   ar\n    23    11    20    1\n    24    13    22    1\n    25    13    23    1\n    26    13    24    1\n@<TRIPOS>MOLECULE\n5816\n 26 26 0 0 0\nSMALL\nGASTEIGER\n\n@<TRIPOS>ATOM\n      1 O           1.7394   -2.1169   -1.0894 O.3     1  LIG1       -0.3859\n      2 O          -2.2941    1.0781   -1.7979 O.3     1  LIG1       -0.5033\n      3 O          -3.6584    0.5842    0.5722 O.3     1  LIG1       -0.5033\n      4 N           2.6359    1.0243    0.7030 N.3     1  LIG1       -0.3162\n      5 C           1.6787   -1.1447   -0.0373 C.3     1  LIG1        0.0927\n      6 C           0.2684   -0.6866    0.1208 C.ar    1  LIG1       -0.0143\n      7 C           2.6376    0.0193   -0.3576 C.3     1  LIG1        0.0258\n      8 C          -0.3658   -0.0099   -0.9212 C.ar    1  LIG1       -0.0109\n      9 C          -0.4164   -0.9343    1.3105 C.ar    1  LIG1       -0.0524\n     10 C          -1.6849    0.4191   -0.7732 C.ar    1  LIG1        0.1586\n     11 C          -1.7353   -0.5053    1.4585 C.ar    1  LIG1       -0.0162\n     12 C          -2.3696    0.1713    0.4166 C.ar    1  LIG1        0.1582\n     13 C           3.5645    2.1013    0.3950 C.3     1  LIG1       -0.0157\n     14 H           2.0210   -1.6511    0.8741 H       1  LIG1        0.0656\n     15 H           2.3808    0.4742   -1.3225 H       1  LIG1        0.0453\n     16 H           3.6478   -0.3931   -0.4831 H       1  LIG1        0.0453\n     17 H           0.1501    0.1801   -1.8589 H       1  LIG1        0.0659\n     18 H           0.0640   -1.4598    2.1315 H       1  LIG1        0.0622\n     19 H           2.9013    0.5888    1.5858 H       1  LIG1        0.1217\n     20 H          -2.2571   -0.7050    2.3907 H       1  LIG1        0.0655\n     21 H           2.6646   -2.4067   -1.1652 H       1  LIG1        0.2103\n     22 H           3.2862    2.6124   -0.5325 H       1  LIG1        0.0388\n     23 H           4.5925    1.7346    0.3078 H       1  LIG1        0.0388\n     24 H           3.5401    2.8441    1.1985 H       1  LIG1        0.0388\n     25 H          -3.2008    1.2997   -1.5231 H       1  LIG1        0.2923\n     26 H          -3.9690    0.3259    1.4570 H       1  LIG1        0.2923\n@<TRIPOS>BOND\n     1     1     5    1\n     2     1    21    1\n     3     2    10    1\n     4     2    25    1\n     5     3    12    1\n     6     3    26    1\n     7     4     7    1\n     8     4    13    1\n     9     4    19    1\n    10     5     6    1\n    11     5     7    1\n    12     5    14    1\n    13     6     8   ar\n    14     6     9   ar\n    15     7    15    1\n    16     7    16    1\n    17     8    10   ar\n    18     8    17    1\n    19     9    11   ar\n    20     9    18    1\n    21    10    12   ar\n    22    11    12   ar\n    23    11    20    1\n    24    13    22    1\n    25    13    23    1\n    26    13    24    1";
var Mol2StringMinimal = "@<TRIPOS>MOLECULE\n5816\n 26 26 0 0 0\nSMALL\nGASTEIGER\n\n@<TRIPOS>ATOM\n      1 O           1.7394   -2.1169   -1.0894 O.3\n      2 O          -2.2941    1.0781   -1.7979 O.3\n      3 O          -3.6584    0.5842    0.5722 O.3\n      4 N           2.6359    1.0243    0.7030 N.3\n      5 C           1.6787   -1.1447   -0.0373 C.3\n      6 C           0.2684   -0.6866    0.1208 C.ar\n      7 C           2.6376    0.0193   -0.3576 C.3\n      8 C          -0.3658   -0.0099   -0.9212 C.ar\n      9 C          -0.4164   -0.9343    1.3105 C.ar\n     10 C          -1.6849    0.4191   -0.7732 C.ar\n     11 C          -1.7353   -0.5053    1.4585 C.ar\n     12 C          -2.3696    0.1713    0.4166 C.ar\n     13 C           3.5645    2.1013    0.3950 C.3\n     14 H           2.0210   -1.6511    0.8741 H\n     15 H           2.3808    0.4742   -1.3225 H\n     16 H           3.6478   -0.3931   -0.4831 H\n     17 H           0.1501    0.1801   -1.8589 H\n     18 H           0.0640   -1.4598    2.1315 H\n     19 H           2.9013    0.5888    1.5858 H\n     20 H          -2.2571   -0.7050    2.3907 H\n     21 H           2.6646   -2.4067   -1.1652 H\n     22 H           3.2862    2.6124   -0.5325 H\n     23 H           4.5925    1.7346    0.3078 H\n     24 H           3.5401    2.8441    1.1985 H\n     25 H          -3.2008    1.2997   -1.5231 H\n     26 H          -3.9690    0.3259    1.4570 H\n@<TRIPOS>BOND\n     1     1     5    1\n     2     1    21    1\n     3     2    10    1\n     4     2    25    1\n     5     3    12    1\n     6     3    26    1\n     7     4     7    1\n     8     4    13    1\n     9     4    19    1\n    10     5     6    1\n    11     5     7    1\n    12     5    14    1\n    13     6     8   ar\n    14     6     9   ar\n    15     7    15    1\n    16     7    16    1\n    17     8    10   ar\n    18     8    17    1\n    19     9    11   ar\n    20     9    18    1\n    21    10    12   ar\n    22    11    12   ar\n    23    11    20    1\n    24    13    22    1\n    25    13    23    1\n    26    13    24    1";
var Mol2StringCrysin = "@<TRIPOS>MOLECULE\n1144204\n    12    11     2     0     0\nSMALL\nUSER_CHARGES\n****\nGenerated from the CSD\n\n@<TRIPOS>ATOM\n     1 Cl1      0.0925   3.6184   1.9845   Cl        1 RES1  -1.0000\n     2 C1      -4.7391   0.3350   0.4215   C.ar      2 RES2   0.0000\n     3 C2      -3.4121   0.2604   0.9351   C.ar      2 RES2   0.0000\n     4 C3      -2.9169   1.2555   1.7726   C.ar      2 RES2   0.0000\n     5 C4      -3.7118   2.3440   2.1099   C.ar      2 RES2   0.0000\n     6 C5      -5.0314   2.4052   1.6209   C.ar      2 RES2   0.0000\n     7 C6      -5.5372   1.4057   0.7962   C.ar      2 RES2   0.0000\n     8 C7      -6.9925   1.4547   0.3334   C.3       2 RES2   0.0000\n     9 C8      -7.8537   0.5554   1.1859   C.3       2 RES2   0.0000\n    10 N1      -9.3089   0.7134   0.8192   N.3       2 RES2   1.0000\n    11 O1      -2.6613  -0.8147   0.5707   O.3       2 RES2   0.0000\n    12 O2      -1.6204   1.0919   2.2584   O.3       2 RES2   0.0000\n@<TRIPOS>BOND\n     1     2     3   ar\n     2     3     4   ar\n     3     4     5   ar\n     4     5     6   ar\n     5     6     7   ar\n     6     7     2   ar\n     7     8     7    1\n     8     9     8    1\n     9    10     9    1\n    10    11     3    1\n    11    12     4    1\n@<TRIPOS>SUBSTRUCTURE\n     1 RES1        1 GROUP             0 ****  ****    0\n     2 RES2        2 GROUP             0 ****  ****    0\n@<TRIPOS>CRYSIN\n   10.5150   11.1300    7.9380   90.0000   90.0000   90.0000    29     5\n@<TRIPOS>MOLECULE\n   1144204\n    12    11     2     0     0\nSMALL\nUSER_CHARGES\n****\nGenerated from the CSD\n\n@<TRIPOS>ATOM\n     1 Cl1      0.0925   3.6184   1.9845   Cl        1 RES1  -1.0000\n     2 C1      -4.7391   0.3350   0.4215   C.ar      2 RES2   0.0000\n     3 C2      -3.4121   0.2604   0.9351   C.ar      2 RES2   0.0000\n     4 C3      -2.9169   1.2555   1.7726   C.ar      2 RES2   0.0000\n     5 C4      -3.7118   2.3440   2.1099   C.ar      2 RES2   0.0000\n     6 C5      -5.0314   2.4052   1.6209   C.ar      2 RES2   0.0000\n     7 C6      -5.5372   1.4057   0.7962   C.ar      2 RES2   0.0000\n     8 C7      -6.9925   1.4547   0.3334   C.3       2 RES2   0.0000\n     9 C8      -7.8537   0.5554   1.1859   C.3       2 RES2   0.0000\n    10 N1      -9.3089   0.7134   0.8192   N.3       2 RES2   1.0000\n    11 O1      -2.6613  -0.8147   0.5707   O.3       2 RES2   0.0000\n    12 O2      -1.6204   1.0919   2.2584   O.3       2 RES2   0.0000\n@<TRIPOS>BOND\n     1     2     3   ar\n     2     3     4   ar\n     3     4     5   ar\n     4     5     6   ar\n     5     6     7   ar\n     6     7     2   ar\n     7     8     7    1\n     8     9     8    1\n     9    10     9    1\n    10    11     3    1\n    11    12     4    1\n@<TRIPOS>SUBSTRUCTURE\n     1 RES1        1 GROUP             0 ****  ****    0\n     2 RES2        2 GROUP             0 ****  ****    0\n@<TRIPOS>CRYSIN\n   10.5150   11.1300    7.9380   90.0000   90.0000   90.0000    29     5\n";
describe('mol2 reader', function () {
    it('basic', function () { return __awaiter(void 0, void 0, void 0, function () {
        var parsed, mol2File, data, molecule, atoms, bonds;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, parseMol2(Mol2String, '').run()];
                case 1:
                    parsed = _a.sent();
                    if (parsed.isError) {
                        throw new Error(parsed.message);
                    }
                    mol2File = parsed.result;
                    // number of structures
                    expect(mol2File.structures.length).toBe(1);
                    data = mol2File.structures[0];
                    molecule = data.molecule, atoms = data.atoms, bonds = data.bonds;
                    // molecule fields
                    expect(molecule.mol_name).toBe('5816');
                    expect(molecule.num_atoms).toBe(26);
                    expect(molecule.num_bonds).toBe(26);
                    expect(molecule.num_subst).toBe(0);
                    expect(molecule.num_feat).toBe(0);
                    expect(molecule.num_sets).toBe(0);
                    expect(molecule.mol_type).toBe('SMALL');
                    expect(molecule.charge_type).toBe('GASTEIGER');
                    expect(molecule.status_bits).toBe('');
                    expect(molecule.mol_comment).toBe('');
                    // required atom fields
                    expect(atoms.count).toBe(26);
                    expect(atoms.atom_id.value(0)).toBe(1);
                    expect(atoms.atom_name.value(0)).toBe('O');
                    expect(atoms.x.value(0)).toBeCloseTo(1.7394, 0.001);
                    expect(atoms.y.value(0)).toBeCloseTo(-2.1169, 0.0001);
                    expect(atoms.z.value(0)).toBeCloseTo(-1.0893, 0.0001);
                    expect(atoms.atom_type.value(0)).toBe('O.3');
                    // optional atom fields
                    expect(atoms.subst_id.value(0)).toBe(1);
                    expect(atoms.subst_name.value(0)).toBe('LIG1');
                    expect(atoms.charge.value(0)).toBeCloseTo(-0.3859);
                    expect(atoms.status_bit.value(0)).toBe('');
                    // required bond fields
                    expect(bonds.count).toBe(26);
                    expect(bonds.bond_id.value(0)).toBe(1);
                    expect(bonds.origin_atom_id.value(0)).toBe(1);
                    expect(bonds.target_atom_id.value(0)).toBe(5);
                    expect(bonds.bond_type.value(0)).toBe('1');
                    // optional bond fields
                    expect(bonds.status_bits.value(0)).toBe('');
                    return [2 /*return*/];
            }
        });
    }); });
    it('multiblocks', function () { return __awaiter(void 0, void 0, void 0, function () {
        var parsed, mol2File, data, molecule, atoms, bonds;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, parseMol2(Mol2StringMultiBlocks, '').run()];
                case 1:
                    parsed = _a.sent();
                    if (parsed.isError) {
                        throw new Error(parsed.message);
                    }
                    mol2File = parsed.result;
                    // number of structures
                    expect(mol2File.structures.length).toBe(2);
                    data = mol2File.structures[1];
                    molecule = data.molecule, atoms = data.atoms, bonds = data.bonds;
                    // molecule fields
                    expect(molecule.mol_name).toBe('5816');
                    expect(molecule.num_atoms).toBe(26);
                    expect(molecule.num_bonds).toBe(26);
                    expect(molecule.num_subst).toBe(0);
                    expect(molecule.num_feat).toBe(0);
                    expect(molecule.num_sets).toBe(0);
                    expect(molecule.mol_type).toBe('SMALL');
                    expect(molecule.charge_type).toBe('GASTEIGER');
                    expect(molecule.status_bits).toBe('');
                    expect(molecule.mol_comment).toBe('');
                    // required atom fields
                    expect(atoms.count).toBe(26);
                    expect(atoms.atom_id.value(0)).toBe(1);
                    expect(atoms.atom_name.value(0)).toBe('O');
                    expect(atoms.x.value(0)).toBeCloseTo(1.7394, 0.001);
                    expect(atoms.y.value(0)).toBeCloseTo(-2.1169, 0.0001);
                    expect(atoms.z.value(0)).toBeCloseTo(-1.0893, 0.0001);
                    expect(atoms.atom_type.value(0)).toBe('O.3');
                    // optional atom fields
                    expect(atoms.subst_id.value(0)).toBe(1);
                    expect(atoms.subst_name.value(0)).toBe('LIG1');
                    expect(atoms.charge.value(0)).toBeCloseTo(-0.3859);
                    expect(atoms.status_bit.value(0)).toBe('');
                    // required bond fields
                    expect(bonds.count).toBe(26);
                    expect(bonds.bond_id.value(0)).toBe(1);
                    expect(bonds.origin_atom_id.value(0)).toBe(1);
                    expect(bonds.target_atom_id.value(0)).toBe(5);
                    expect(bonds.bond_type.value(0)).toBe('1');
                    // optional bond fields
                    expect(bonds.status_bits.value(0)).toBe('');
                    return [2 /*return*/];
            }
        });
    }); });
    it('minimal', function () { return __awaiter(void 0, void 0, void 0, function () {
        var parsed, mol2File, data, molecule, atoms, bonds;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, parseMol2(Mol2StringMinimal, '').run()];
                case 1:
                    parsed = _a.sent();
                    if (parsed.isError) {
                        throw new Error(parsed.message);
                    }
                    mol2File = parsed.result;
                    // number of structures
                    expect(mol2File.structures.length).toBe(1);
                    data = mol2File.structures[0];
                    molecule = data.molecule, atoms = data.atoms, bonds = data.bonds;
                    // molecule fields
                    expect(molecule.mol_name).toBe('5816');
                    expect(molecule.num_atoms).toBe(26);
                    expect(molecule.num_bonds).toBe(26);
                    expect(molecule.num_subst).toBe(0);
                    expect(molecule.num_feat).toBe(0);
                    expect(molecule.num_sets).toBe(0);
                    expect(molecule.mol_type).toBe('SMALL');
                    expect(molecule.charge_type).toBe('GASTEIGER');
                    expect(molecule.status_bits).toBe('');
                    expect(molecule.mol_comment).toBe('');
                    // required atom fields
                    expect(atoms.count).toBe(26);
                    expect(atoms.atom_id.value(0)).toBe(1);
                    expect(atoms.atom_name.value(0)).toBe('O');
                    expect(atoms.x.value(0)).toBeCloseTo(1.7394, 0.001);
                    expect(atoms.y.value(0)).toBeCloseTo(-2.1169, 0.0001);
                    expect(atoms.z.value(0)).toBeCloseTo(-1.0893, 0.0001);
                    expect(atoms.atom_type.value(0)).toBe('O.3');
                    // optional atom fields
                    expect(atoms.subst_id.value(0)).toBe(0);
                    expect(atoms.subst_name.value(0)).toBe('');
                    expect(atoms.charge.value(0)).toBeCloseTo(0);
                    expect(atoms.status_bit.value(0)).toBe('');
                    // required bond fields
                    expect(bonds.count).toBe(26);
                    expect(bonds.bond_id.value(0)).toBe(1);
                    expect(bonds.origin_atom_id.value(0)).toBe(1);
                    expect(bonds.target_atom_id.value(0)).toBe(5);
                    expect(bonds.bond_type.value(0)).toBe('1');
                    // optional bond fields
                    expect(bonds.status_bits.value(0)).toBe('');
                    return [2 /*return*/];
            }
        });
    }); });
    it('crysin', function () { return __awaiter(void 0, void 0, void 0, function () {
        var parsed, mol2File, _i, _a, data;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, parseMol2(Mol2StringCrysin, '').run()];
                case 1:
                    parsed = _b.sent();
                    if (parsed.isError) {
                        throw new Error(parsed.message);
                    }
                    mol2File = parsed.result;
                    // number of structures
                    expect(mol2File.structures.length).toBe(2);
                    // crysin fields
                    for (_i = 0, _a = mol2File.structures; _i < _a.length; _i++) {
                        data = _a[_i];
                        expect(data.crysin).toEqual({
                            a: 10.5150,
                            b: 11.1300,
                            c: 7.9380,
                            alpha: 90.0,
                            beta: 90.0,
                            gamma: 90.0,
                            spaceGroup: 29,
                            setting: 5
                        });
                    }
                    return [2 /*return*/];
            }
        });
    }); });
});
