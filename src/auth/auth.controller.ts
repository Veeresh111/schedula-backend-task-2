import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('doctor-test')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('doctor')
  doctorTest() {
    return { message: 'Doctor access granted' };
  }

  @Get('patient-test')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('patient')
  patientTest() {
    return { message: 'Patient access granted' };
  }
}