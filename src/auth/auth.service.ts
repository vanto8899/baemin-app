import { Prisma, Role, User } from '@prisma/client';
import { Injectable, BadRequestException, ConflictException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt'; // Import JwtService
import { PrismaService } from 'src/prisma.service';
import { RegisterUserDto } from './dto/RegisterUser.dto';
import { LoginUserDto } from './dto/LoginUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,  // Inject PrismaService
    private readonly jwtService: JwtService, // Inject JwtService
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const { fullname, username, email, phone, password, role, address} = registerUserDto;

    // Kiểm tra nếu email hoặc username đã tồn tại
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }, { phone }],
      },
    });
    if (existingUser) {
      throw new ConflictException('Email hoặc username or phone đã tồn tại');
    }

    // Mã hóa mật khẩu trước khi lưu
    const hashedPassword = await bcrypt.hash(password, 10);

     // Create the new user in the database
     return this.prisma.user.create({
      data: {
        fullname,
        username,
        email,
        phone,
        password: hashedPassword,
        role: role ?? Role.CUSTOMER,
        address,
      },
    });
  }

  async login(loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    const { username, email, phone, password } = loginUserDto;
    
    // Find the user based on the provided identifier
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { username },
          { email },
          { phone },
        ],
      },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Create JWT token
    const payload = { username: user.username, sub: user.id, role: user.role };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

}
